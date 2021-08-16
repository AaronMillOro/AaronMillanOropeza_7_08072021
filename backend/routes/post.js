const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

const auth = require('../middleware/authorization');
const multer = require('../middleware/multer_config');

router.get('/posts', auth, postCtrl.allPosts);
router.post('/posts', auth, multer, postCtrl.createPost);
router.get('/posts/:id_post', auth, postCtrl.displayPost);
router.post('/posts/:id_post', auth, postCtrl.createOpinion);
router.delete('/posts/:id_post/:id_opinion', auth, postCtrl.deleteOpinion);


module.exports = router;