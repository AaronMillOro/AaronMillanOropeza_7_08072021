const db = require('../models/index');
const Post = db.Post;
const Opinion = db.Opinion;
const User = db.User;
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');


// GET all posts
exports.allPosts = (req, res, next) => {
  Post.findAll({ 
    order: [['createdAt', 'DESC']],
    attributes: ['id', 'text', 'imageUrl', 'createdAt','likes', 'userId', 'countOpinions'],
    include: {model: User, attributes: ['id', 'pseudo', 'imageUrl']}
  })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(404).json({ error }));
};


// POST new publication
exports.createPost = (req, res, next) => {

  if (!req.body.text) {
    return res.status(400).json({ message: 'Text field is required'});
  }
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const post = req.file ? {
    text: req.body.text,
    userId: decodedToken.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`
  } : { 
    text: req.body.text,
    userId: decodedToken.userId,
  };
  Post.create(post)
    .then( res.status(201).json({ message: 'New post' }) )
    .catch( error => res.status(422).json({ error }) );
};


// GET a specific publication and its related opinions, counter updated in case of removed opinions
exports.displayPost = (req, res, next) => {
  Post.findOne({ 
    where: {id: parseInt(req.params.id_post) }, 
    attributes: ['id', 'text', 'imageUrl', 'likes', 'usersLike', 'countOpinions', 'createdAt', 'userId'],
    include: {model: User, attributes: ['id', 'pseudo', 'imageUrl']}
  })
    .then(post => {
      Opinion.findAll({ 
        where: {postId: post.id}, 
        order: [['createdAt', 'ASC']],
        attributes: ['id', 'content', 'createdAt', 'userId'],
        include: {
          model: User, attributes: ['id', 'pseudo', 'imageUrl']
        }
      })
        .then(opinions => {
          // update of counter
          const new_counter = opinions.length;
          Post.update({ countOpinions: new_counter }, { where: {id: post.id} })
            .then( () => {
              const fullOpinions = opinions; 
              fullOpinions.forEach(opinion => {
                const token = req.headers.authorization.split(' ')[1];
                const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
                if ((opinion.userId === decodedToken.userId) || (res.locals.canDelete === 'all')){
                  opinion.dataValues.canDelete = true;
                } else {
                  opinion.dataValues.canDelete = false;
                }
              });
              res.status(200).json({ post: post, heart: res.locals.heart, canDelete: res.locals.canDelete, opinions: fullOpinions })
            })
            .catch( error => res.status(404).json({ error }) );
        })
        .catch(error => res.status(404).json({ error }));
    })
    .catch(error => res.status(404).json({ error }));
};


// DELETE a publication
exports.deletePost = (req, res, next) => {
  Post.destroy({ where: {id: req.params.id_post} })
    .then(() => res.status(200).json({ message: 'Post removed succesfully' }))
    .catch(error => res.status(400).json({ error }));
};


// DELETE an opinion
exports.deleteOpinion = (req, res, next) => {
  Opinion.destroy({ where: {id: req.params.id_opinion} })
    .then(() => {
      Post.findOne({ where: {id: req.params.id_post} })
        .then(post => {
          const counter = (post.countOpinions - 1);
          Post.update({ countOpinions: counter }, { where: {id: post.id} })
            .then(res.status(200).json({ message: 'Opinion deleted!' }))
            .catch( error => res.status(404).json({ error }) );
        })
        .catch(error => res.status(404).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
};


// POST creates an opinion associated to a publication
exports.createOpinion = (req, res, next) => {
  if (!req.body.content) {
    return res.status(400).json({ message: 'Content is required'});
  }
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const opinion = {
    content: req.body.content,
    userId: decodedToken.userId,
    postId: req.params.id_post
  };
  Opinion.create(opinion)
    .then(() => {
      // To update opinions counter in Post instance
      Post.findOne({ where: {id: req.params.id_post} })
        .then(post => {
          const counter = (post.countOpinions + 1);
          Post.update({ countOpinions: counter }, { where: {id: post.id} })
            .then( res.status(201).json({ message: 'New opinion' }) )
            .catch( error => res.status(404).json({ error }) );
        })
        .catch(error => res.status(404).json({ error }));
    })
    .catch( error => res.status(422).json({ error }) );
};


// PUT like or dislike in a publication
exports.likePost = (req, res, next) => {  
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    if ( (req.body.like === 1) || (req.body.like === 0) ){
      Post.findOne({ where: {id: req.params.id_post}, attributes: ['id', 'likes', 'usersLike'] })
        .then(post => {
          // first like
          let likes = post.likes;
          if (post.usersLike === null) {
            let arrayLikes = [];
            arrayLikes.push(decodedToken.userId);
            const new_usersLike = JSON.stringify(arrayLikes);
            likes += 1;
            Post.update({ usersLike: new_usersLike, likes: likes }, { where: {id: post.id} })
              .then( res.status(200).json({ message: 'Post preference set' }) )
              .catch( error => res.status(404).json({ error }) );
          } else {
            let arrayLikes = JSON.parse(post.usersLike);
            // Can dislike
            if (arrayLikes.includes(decodedToken.userId)) {
              arrayLikes = arrayLikes.filter(item => item !== decodedToken.userId);
              const new_usersLike = JSON.stringify(arrayLikes);
              likes -= 1;
              Post.update({ usersLike: new_usersLike, likes: likes }, { where: {id: post.id} })
                .then( res.status(200).json({ message: 'Post preference set' }) )
                .catch( error => res.status(404).json({ error }) );
            } else {
              // Can like
              arrayLikes.push(decodedToken.userId);
              const new_usersLike = JSON.stringify(arrayLikes);
              likes += 1;
              Post.update({ usersLike: new_usersLike, likes: likes }, { where: {id: post.id} })
                .then( res.status(200).json({ message: 'Post preference set' }) )
                .catch( error => res.status(404).json({ error }) );
            }
          }
        })
        .catch(error => res.status(404).json({ error }));
    } else {
      return res.status(400).json({ message: 'Provide correct like value'});
    }
  } catch (error) {
    res.status(400).json({ error })
  }
};