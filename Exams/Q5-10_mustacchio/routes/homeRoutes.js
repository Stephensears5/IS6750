const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController')

// Define route handlers
router.get("/", homeController.getHome);

module.exports = router;