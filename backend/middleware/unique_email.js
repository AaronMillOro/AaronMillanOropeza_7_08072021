const db = require("../database/db_config");

module.exports = (req, res, next) => {
  try {
    db.user.findOne({ where: { email: req.body.email }, attributes: ['email'] }).
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
