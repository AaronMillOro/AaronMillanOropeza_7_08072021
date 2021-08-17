const db = require('../models/index');
const Post = db.Post;
const Opinion = db.Opinion;
const User = db.User;


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
  const post = req.file ? {
    text: req.body.text,
    userId: req.body.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`
  } : { 
    text: req.body.text,
    userId: req.body.userId,
  };
  Post.create(post)
    .then( res.status(201).json({ message: 'New post' }) )
    .catch( error => res.status(422).json({ error }) );
};


// GET a specific publication and its related opinions
exports.displayPost = (req, res, next) => {
  Post.findOne({ 
    where: {id: req.body.postId}, 
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
          res.status(200).json({ post: post, opinions: opinions })
        })
        .catch(error => res.status(404).json({ error }));
    })
    .catch(error => res.status(404).json({ error }));
};


// DELETE a publication
exports.deletePost = (req, res, next) => {
  Post.destroy({ where: {id: req.body.postId} })
    .then(() => res.status(200).json({ message: 'Post removed succesfully' }))
    .catch(error => res.status(400).json({ error }));
};


// DELETE an opinion
exports.deleteOpinion = (req, res, next) => {
  Opinion.destroy({ where: {id: req.body.opinionId} })
    .then(() => {
      Post.findOne({ where: {id: req.body.postId} })
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
  const opinion = {
    content: req.body.content,
    userId: req.body.userId,
    postId: req.body.postId
  };
  Opinion.create(opinion)
    .then(() => {
      // To update opinions counter in Post instances
      Post.findOne({ where: {id: req.body.postId} })
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
    if (!req.body.postId){
      return res.status(400).json({ message: 'Publication identifier is required'});
    }
    if ( (req.body.like === 1) || (req.body.like === 0) ){
      Post.findOne({ where: {id: req.body.postId}, attributes: ['id', 'likes', 'usersLike'] })
        .then(post => {
          // check status of users preferences
          let usersLike = post.usersLike; // for conditionals simplicity
          let likes = post.likes;
          if (!post.usersLike) {
            let usersLike = [];
            usersLike.push(req.body.userId);
            likes += 1;
          }
          // Case to add like
          // Case to remove like
          Post.update({ usersLike: usersLike, likes: likes }, { where: {id: post.id} })
            .then( res.status(200).json({ message: 'Post preference set' }) )
            .catch( error => res.status(404).json({ error }) );
        })
        .catch(error => res.status(404).json({ error }));
    } else {
      return res.status(400).json({ message: 'Provide correct like value'});
    }
  } catch (error) {
    res.status(400).json({ error })
  }
};