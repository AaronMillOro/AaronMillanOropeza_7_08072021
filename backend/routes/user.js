const express = require('express');
const router = express.Router();

// TODO import:  controllers
const userCtrl = require('../controllers/user');

// Middlewares
const entryValidator = require('../middleware/login_form_validator');
const passwordValidator = require('../middleware/password_validator');
const uniqueEmail = require('../middleware/unique_email');
// TODO multer
// TODO auth

// User routes
router.post('/auth/signup', entryValidator, uniqueEmail, passwordValidator, userCtrl.signup);


module.exports = router;