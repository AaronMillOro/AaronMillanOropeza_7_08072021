const db = require('../models/index');
const Post = db.Post;
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    Post.findOne({ where: {id: parseInt(req.params.id_post)}, attributes: ['id', 'usersLike'] })
      .then(post => {
        const usersLike = JSON.parse(post.usersLike);
        if (usersLike === null) {
          res.locals.heart = "off_heart";
          next();
        }
        else if(usersLike.includes(decodedToken.userId)){
          res.locals.heart = "on_heart";
          next();
        } else {
          res.locals.heart = "off_heart";
          next();
        }
      })
      .catch( error => res.status(404).json({ error }) );
  }catch (error) {
    res.status(400).json({ error });
  }
};
