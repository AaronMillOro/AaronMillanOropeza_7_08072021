const bcrypt = require('bcrypt');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const db = require('../database/db_config');
const User = db.user;


// POST account creation
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


// POST login account
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


// GET user account
exports.account = (req, res, next) => {
  if ( req.body.userId !== parseInt(req.params.id) ) {
    return res.status(401).json({error: 'Unauthorized request'});
  }
  User.findOne({ 
    where: { id: req.params.id }, 
    attributes: ['id', 'email', 'pseudo', 'job', 'imageUrl', 'createdAt'] 
  })
    .then(user => {
      if (!user){
        return res.status(404).json({ error: 'User not found'});
      }
      res.status(200).json({ user: user })
    })
    .catch(error => res.status(404).json({ error }));
};


// PUT modify user account data
exports.updateAccount = (req, res, next) => {
  User.findOne({ 
    where: { id: req.params.id }, 
    attributes: ['id', 'email', 'pseudo', 'job', 'imageUrl','createdAt'] 
  })
    .then(user => {
      if (!user){
        return res.status(404).json({ error: 'User not found'});
      }
      const form_data = req.file ? 
        { ...JSON.parse(req.body), 
          imageUrl: `${req.protocol}://${req.get('host')}/img/${req.file.filename}` 
        } : { 
          ...req.body
        }; // only job, pseudo and/or image
        console.log({...JSON.parse(req.body)});
      User.update({ ...form_data }, { where: {id: user.id} })
        .then(res.status(200).json({ userId: user.id, message: 'User data updated' }) )
        .catch(error => res.status(404).json({ error }));
    })
    .catch(error => res.status(404).json({ error }));
};