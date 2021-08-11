const md5 = require('md5');
const multer = require('multer');

// allowed extensions
const MIME_TYPES = {
  'image/jpg': 'jpg', 
  'image/jpeg': 'jpg', 
  'image/png': 'png', 
  'image/gif': 'gif'
};

// store images folder named 'img' 
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'img')
  },
  filename: (req, file, callback) => {
    // sanitizer 
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, md5(name) + '_' + Date.now() + '.' + extension);
  }
});

module.exports = multer({ storage }).single('image');