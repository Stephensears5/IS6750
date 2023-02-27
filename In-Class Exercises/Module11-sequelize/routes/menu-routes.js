const express = require('express');
const router = express.Router();

const menuController = require('../controllers/menu-controller')

// Return items in a category
router.get("/categories/:categoryId/items", menuController.getMenu)
// Return a specific menu item
router.get("/categories/:categoryId/items/:itemId", menuController.getMenuItem)

module.exports = router;