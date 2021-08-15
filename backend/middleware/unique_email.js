const db = require("../models/index");

module.exports = (req, res, next) => {
  try {
    db.User.findOne({ where: { email: req.body.email }, attributes: ['email'] }).
      then(email => {
        if (email !== null) {
          return res.status(400).json({ error: 'Email already registered' });
        } else {
          next();
        }
      }).
      catch( error => res.status(400).json({ error }) ); 
  } catch (error) {
    res.status(500).json({ error });
  } 
};
