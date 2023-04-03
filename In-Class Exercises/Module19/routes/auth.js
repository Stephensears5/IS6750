const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/auth/signup', authController.getSignup);

router.post('/auth/login', authController.postLogin);

router.post('/auth/signup', authController.postSignup);

router.post('/logout', authController.postLogout);

module.exports = router;