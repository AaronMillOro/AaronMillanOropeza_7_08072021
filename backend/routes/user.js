const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

const entryValidator = require('../middleware/login_form_validator');
const passwordValidator = require('../middleware/password_validator');
const uniqueEmail = require('../middleware/unique_email');
const auth = require('../middleware/authorization');
// TODO multer for profile

router.post('/auth/signup', entryValidator, uniqueEmail, passwordValidator, userCtrl.signup);
router.post('/auth/login', entryValidator, userCtrl.login);
router.get('/account/:id', auth, userCtrl.account);
router.put('/account/:id', auth, userCtrl.updateAccount);

module.exports = router;