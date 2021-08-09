module.exports = (req, res, next) => {
  try {
    console.log(req.body);
    if (!req.body.email || !req.body.password){
      return res.status(400).json({ message: 'Provide the email and password'});
    } 
    else if ( !req.body.email.endsWith('groupomania.com') ) {
      return res.status(401).json({ message: 'Not allowed email' });
    }
    else {
      next();
    }
  } catch (error) {
    res.status(500).json({ error });
  } 
};
