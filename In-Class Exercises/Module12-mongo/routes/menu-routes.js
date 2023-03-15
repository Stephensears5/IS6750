const express = require('express');
const router = express.Router();

const menuController = require('../controllers/menu-controller')

// Return items in a category
router.get("/:catSlug", menuController.getMenu)
// Return a specific menu item
router.get("/:catSlug/:itemSlug", menuController.getMenuItem)

module.exports = router;