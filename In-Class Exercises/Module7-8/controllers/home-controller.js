exports.getHome = (req, res, next) => {
        res.render('index', {pageTitle: "home"})
}

exports.getAbout = (req,res,next)=>{
    res.render('about', {pageTitle: "about"});
}