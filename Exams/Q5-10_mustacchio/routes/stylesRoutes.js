const express = require('express');
const router = express.Router();

const stylesController = require('../controllers/stylesController')

// Define route handlers
router.get('/', stylesController.getStyles)
router.get("/:titleSlug", stylesController.getStyleItem);

module.exports = router;