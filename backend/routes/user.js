const express = require('express');
const router = express.Router();

// TODO import: multer, auth, controllers
const userCtrl = require('../controllers/user');

// Middlewares
const loginValidator = require('../middleware/login_form_validator');

// User routes
router.post('/auth/signup', loginValidator, userCtrl.signup);


module.exports = router;