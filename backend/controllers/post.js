const db = require('../database/db_config');
const Post = db.post;


exports.allPosts = (req, res, next) => {
  Post.findAll()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(404).json({ error }));
};


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
    userId: req.body.userId
  };
  Post.create(post)
    .then( res.status(201).json({ message: "New post" }) )
    .catch( error => res.status(422).json({ error }) );
};
