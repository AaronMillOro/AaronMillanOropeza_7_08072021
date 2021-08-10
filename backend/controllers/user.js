const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const db = require('../database/db_config');
const User = db.user;


exports.signup = (req, res, next) => {
  // Encrypt password 
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = {
        email: req.body.email,
        password: hash
      };
      // Save entity into DB
      User.create(user)
        .then( res.status(200).json({ message: "New user registered !" }) )
        .catch( error => res.status(422).json({ error }) );
    })
    .catch(error => res.status(500).json( {error} ));
};


exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email }, attributes: ['id', 'email', 'password', 'isAdmin'] })
    .then(user => {
      if (!user){
        return res.status(404).json({ error: 'User not found'});
      }
      // Password decrypt
      bcrypt.compare(req.body.password, user.password)
        .then(correct_pass => {
          if (!correct_pass){
            return res.status(401).json({ error: 'Wrong password'});
          }
          // Returns the userID + a jwt with userId
          res.status(200).json({
            userId: user.id,
            token: jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, { expiresIn: '2h' }),
          });
        })
        .catch(error => res.status(401).json({ error }));
    })
    .catch(error => res.status(404).json({ error }));
};


// updateAccount
exports.account = (req, res, next) => {
  
  console.log(req.body)
  
};