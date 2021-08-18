const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

const auth = require('../middleware/authorization');
const multer = require('../middleware/multer_config');
const canDelete = require('../middleware/delete_permission');
const likeOrDislike = require('../middleware/like_or_dislike');

router.get('/posts', auth, postCtrl.allPosts);
router.post('/posts', auth, multer, postCtrl.createPost);
router.get('/posts/:id_post', auth, likeOrDislike, postCtrl.displayPost);
router.delete('/posts/:id_post', auth, canDelete, postCtrl.deletePost);
router.put('/posts/:id_post', auth, postCtrl.likePost);
router.post('/posts/:id_post', auth, postCtrl.createOpinion);
router.delete('/posts/:id_post/:id_opinion', auth, canDelete, postCtrl.deleteOpinion);


module.exports = router;