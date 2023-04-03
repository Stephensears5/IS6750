const posts = [];

exports.getPosts = (req, res, next) => {
    console.log("blah", res.body, next);
  const response = res
    .status(200)
    .json({
      posts: res.body,
    });
    // console.log("body",body)
    posts.push(response);
    console.log("posts",posts);
    return posts;
};

exports.createPost = (req,res,next) => {

    const title = req.body.title;
    const content = req.body.content;
    console.log(title, content);
    // Create post in db
    res.status(201).json({
        message: 'Post created successfully!',
        post: {id: new Date().toISOString(), title: title, content: content }
    });
}

exports.updatePost = (req,res,next) => {
    const id = req.body.id;
    const title = req.body.title
    const content = req.body.content
    res.status(201).json({
        message: 'Post Updated!',
        post: {id: id, title: title, content: content}
    })
}

exports.deletePost = (req,res,next) => {
    const id = req.body.id;
    res.status(201).json({
        message: 'Post Deleted!',
        post: {id: id}
    })
}
