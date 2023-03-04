const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contactController')

// Define route handlers
router.get('/contacts/new', contactController.getContact)
router.post('/contacts/create', contactController.postContact)
router.get('/contact/thanks', contactController.getThanks)

router.get('/contacts', contactController.getContacts)
router.get("/contacts/:id/edit", contactController.getContactItem);
router.post("/contacts/:id/update", contactController.postResponse);


module.exports = router;