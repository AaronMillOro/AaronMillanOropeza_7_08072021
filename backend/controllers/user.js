const db = require('../database/db_config');
const User = db.user;


exports.signup = (req, res, next) => {

  const user = {
    email: req.body.email,
    password: req.body.password 
  };
  // Save post in DB
  User.create(user)
    .then( res.status(200).json({ message: "New user registered !" }) )
    .catch( error => res.status(422).json({ error }) );
};
