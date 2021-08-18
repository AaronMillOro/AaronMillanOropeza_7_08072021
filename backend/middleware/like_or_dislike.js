const db = require('../models/index');
const Post = db.Post;

module.exports = (req, res, next) => {
  try {
    Post.findOne({ where: {id: req.body.postId}, attributes: ['id', 'usersLike'] })
      .then(post => {
        const usersLike = JSON.parse(post.usersLike);
        if(usersLike.includes(req.body.userId)){
          res.locals.heart = "off_heart";
          next();
        } else {
          res.locals.heart = "on_heart";
          next();
        }
      })
      .catch( error => res.status(404).json({ error }) );
  }catch (error) {
    res.status(400).json({ error });
  }
};