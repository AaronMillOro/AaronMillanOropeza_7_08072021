const db = require('../models/index');
const Post = db.Post;
const Opinion = db.Opinion;


// GET all posts
exports.allPosts = (req, res, next) => {
  Post.findAll()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(404).json({ error }));
};


// POST new publication
exports.createPost = (req, res, next) => {
  if (!req.body.text) {
    return res.status(400).json({ message: "Text field is required"});
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
    .then( res.status(201).json({ message: "New post" }) )
    .catch( error => res.status(422).json({ error }) );
};


// GET a specific publication and its related opinions
exports.displayPost = (req, res, next) => {
  Post.findOne({ where: {id: req.body.postId} })
    .then(post => {
      Opinion.findAll({ where: {postId: post.id} })
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
    .then(() => res.status(200).json({ message: 'Opinion deleted!' }))
    .catch(error => res.status(400).json({ error }));
};


// POST creates an opinion associated to a publication
exports.createOpinion = (req, res, next) => {
  if (!req.body.content) {
    return res.status(400).json({ message: "Content is required"});
  }
  const opinion = {
    content: req.body.content,
    userId: req.body.userId,
    postId: req.body.postId
  };
  Opinion.create(opinion)
    .then( res.status(201).json({ message: "New opinion" }) )
    .catch( error => res.status(422).json({ error }) );
};
