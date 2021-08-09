const express = require('express');
const router = express.Router();

// TODO import: multer, auth, controllers
const postCtrl = require('../controllers/post');

router.post('/posts', postCtrl.createPost);


module.exports = router;