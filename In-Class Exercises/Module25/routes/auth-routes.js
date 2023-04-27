const router = require('express').Router();
const authController = require('../controllers/auth-controller');

router.get('/signup', authController.getSignup);

router.get('/login', authController.getLogin);

router.post('/signup', authController.postSignup);

router.post('/login', authController.findUser, authController.processLogin);

router.get('/logout', authController.getLogout);

module.exports = router;