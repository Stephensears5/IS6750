const router = require('express').Router();
const apiController = require('../controllers/api-controller');
const menuController = require('../controllers/menu-controller');
const authController = require('../controllers/auth-controller');

router.get('/auth', authController.findUser, apiController.getToken);
router.get('/menu', menuController.getMenu, apiController.sendMenuJSON);
router.get('/menu/:catSlug', menuController.getMenu, menuController.getItemsByCategory, apiController.sendCategoryJSON);

module.exports = router;