const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if(!token) {
      return res.status(403).json( {error: 'Access denied'} );
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    if( parseInt(req.params.id) !== decodedToken.userId ) {
      if (decodedToken.isAdmin === true) {
        console.log('Auth control passed');
        next();
      } else {
        return res.status(403).json({error: 'Non-valid user permission'});
      }
    } else {
      console.log('Auth control passed');
      next();
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};
