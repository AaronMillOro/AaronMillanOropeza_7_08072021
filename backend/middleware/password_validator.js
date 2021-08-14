const passwordRules = require('../models/password');

module.exports = (req, res, next) => {
  try {
    if (!passwordRules.validate(req.body.password)){
      return res.status(400).json({ error: 'Password should contain: at least 8 characters, upper and lower case, 1 digit and 1 character' });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ error });
  } 
};
