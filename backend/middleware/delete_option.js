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
    if( decodedToken.isAdmin === true ) {
      res.locals.canDelete = 'all';
      console.log('Allowed to delete anything');
      next();
    } else {
      Post.findOne({ where: {id: req.body.postId}, attributes: ['id', 'userId'] })
        .then(post => {
          if (post.userId === decodedToken.userId){ 
            res.locals.canDelete = true;
            console.log('Allowed to delete');
            next(); 
          } else {
            next();
          }
        })
        .catch(error => res.status(401).json({error}) );
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};
