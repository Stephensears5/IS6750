const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home-controller')

// Define route handlers
router.get("/", homeController.getHome);

router.get("/about", homeController.getAbout);

router.get("/contact", homeController.getContact);

module.exports = router;