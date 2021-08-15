const passwordValidator = require('password-validator');

const passwordModel = new passwordValidator();
// properties to be fullfilled
passwordModel
  .is().min(8)   // Minimum length 8
  .has().uppercase()   // Must have uppercase letters
  .has().lowercase()   // Must have lowercase letters
  .has().digits(1)   // Must have at least 1 digit
  .has().symbols(1)   // Must have at least 1 special character
  .is().not().oneOf(['password', '12345678', '123pasword', 'password123']); // Blacklist these values

module.exports = (req, res, next) => {
  try {
    if (!passwordModel.validate(req.body.password)){
      return res.status(400).json({ error: 'Password should contain: at least 8 characters, upper and lower case, 1 digit and 1 character' });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ error });
  } 
};
