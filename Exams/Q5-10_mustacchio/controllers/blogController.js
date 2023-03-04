const Blogs = require("../models/blogs");
const bulkPosts = require("../data/bulk-add-blog-posts.json");

exports.getBlogs = async (req, res, next) => {
  try {
    blogs = await Blogs.findAll({order: [['postDate', 'DESC']]});
    // console.log("Selected blogs: ", blogs);
    if (blogs) {
      res.render("blog", { pageTitle: "Blog", items: blogs });
    } else {
      res.send("<h1>Oops!  No page found.</h1>");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getBlogItem = async (req, res, next) => {
  const blogsSlug = req.params.titleSlug;
//   console.log("slug", blogsSlug);
  try {
    blog = await Blogs.findOne({
      where: { titleSlug: blogsSlug },
    });
    // console.log("blog", blog);
    if (blog) {
      res.render("blog-single-post", { pageTitle: "Blogs", items: blog });
    }
  } catch (err) {
    console.log("An Error Occured in SylesController getBlogItem", err);
  }
};

exports.getCreateBlog=(req,res,next) => {
    res.render("createblog", {pageTitle: "Blogs"})
}

exports.postBlog = (req, res, next) => {
    const title = req.body.title;
    const summary = req.body.summary;
    const imageUrl = req.body.imageUrl;
    const content = req.body.content;
    const datePosted = new Date();
  
    Blogs.create({
      title: title,
      summary: summary,
      content: content, 
      imageUrl: imageUrl.toLowerCase(), 
      postDate: datePosted,
    })
      .then((result) => {
        console.log("Blog Post Created");
        res.redirect("/blog");
      })
      .catch((err) => console.log(err));
}

exports.bulkAddBlogPosts = (req, res, next) => {
  Blogs.bulkCreate(bulkPosts)
    .then((result) => {
      console.log("Blog Posts Created!");
    })
    .catch((err) => console.log(err));
};
