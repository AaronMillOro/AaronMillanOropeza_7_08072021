const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

const auth = require('../middleware/authorization');
const hasAccess =require('../middleware/internal_access');
const multer = require('../middleware/multer_config');
const allowedToDelete = require('../middleware/delete_permission');
const canDelete = require('../middleware/delete_option');
const likeOrDislike = require('../middleware/like_or_dislike');

router.get('/posts', hasAccess, postCtrl.allPosts);
router.post('/posts', auth, multer, postCtrl.createPost);
router.get('/posts/:id_post', hasAccess, likeOrDislike, canDelete, postCtrl.displayPost);
router.delete('/posts/:id_post', hasAccess, allowedToDelete, postCtrl.deletePost);
router.put('/posts/:id_post', auth, postCtrl.likePost);
router.post('/posts/:id_post', auth, postCtrl.createOpinion);
router.delete('/posts/:id_post/:id_opinion', hasAccess, allowedToDelete, postCtrl.deleteOpinion);


module.exports = router;