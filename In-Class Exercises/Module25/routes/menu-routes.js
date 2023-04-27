const express = require('express');

const router = express.Router();

const menuController = require('../controllers/menu-controller');

//Get menu items in a category
router.get("/:catSlug", menuController.getMenu, menuController.getItemsByCategory, menuController.renderMenu);

//Get a specific menu item
router.get("/:catSlug/:itemSlug", menuController.getMenuItem);

module.exports = router;