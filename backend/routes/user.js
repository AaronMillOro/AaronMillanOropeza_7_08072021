const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

const entryValidator = require('../middleware/login_form_validator');
const passwordValidator = require('../middleware/password_validator');
const uniqueEmail = require('../middleware/unique_email');
const auth = require('../middleware/authorization');
const hasAccess =require('../middleware/internal_access');
const multer = require('../middleware/multer_config');
const canDelete = require('../middleware/delete_option');
const allowedToDelete = require('../middleware/delete_permission');

router.post('/auth/signup', entryValidator, uniqueEmail, passwordValidator, userCtrl.signup);
router.post('/auth/login', entryValidator, userCtrl.login);
router.get('/auth/account/:id', auth, userCtrl.account);
router.put('/auth/account/:id', auth, multer, userCtrl.updateAccount);
router.put('/auth/account/:id/avatar', multer, userCtrl.updateAvatar); // add auth upon integration
router.get('/account/:id', hasAccess, canDelete, userCtrl.account);
router.delete('/account/:id', auth, allowedToDelete, userCtrl.deleteAccount); // only accessible to admin


module.exports = router;