const express = require('express');

const userData = require('./add-user');

const router = express.Router();

router.get('/users', (req, res, next) => {
    const users = userData.users;
    res.render('users', {users: users, pageTitle: 'Users', path: '/users', hasUsers: users.length > 0, activeusers: true, usersCss: true});
})

module.exports = router;