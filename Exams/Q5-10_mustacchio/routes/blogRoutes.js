const express = require('express');
const router = express.Router();

const blogController = require('../controllers/blogController')

// Define route handlers
router.get('/blog', blogController.getBlogs);
router.post("/blog/create", blogController.postBlog);
router.get("/blog/:titleSlug", blogController.getBlogItem);
router.get("/createblog", blogController.getCreateBlog);



module.exports = router;