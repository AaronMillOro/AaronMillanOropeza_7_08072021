const bcrypt =require('bcrypt');
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
