const db = require('../models/index');
const Post = db.Post;
const Opinion = db.Opinion;
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // known that exists
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    // all power
    if( decodedToken.isAdmin === true  ) {
      console.log('Allowed to delete');
      next();
    } else {
      // check cases for opinion or post
      if(req.body.opinionId) {
        Opinion.findOne({ where: {id: req.body.opinionId}, attributes: ['id', 'userId'] })
          .then(opinion => {
            if (opinion.userId === decodedToken.userId){ 
              console.log('Allowed to delete opinion');
              next(); 
            } else {
              return res.status(403).json({error: 'Denied permission'});
            }
          })
          .catch(error => res.status(401).json({ error }));
      } else {
        Post.findOne({ where: {id: req.body.postId}, attributes: ['id', 'userId'] })
          .then(post => {
            if (post.userId === decodedToken.userId){ 
              console.log('Allowed to delete post');
              next(); 
            } else {
              return res.status(403).json({error: 'Denied permission'});
            }
          })
          .catch(error => res.status(401).json({error}) );
      }
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};
