exports.getHome = (req, res, next) => {
    res.render("index", {pageTitle: "Home"});
}

exports.getAbout = (req, res, next) => {
    res.render("about", {pageTitle: "About"});
}

exports.getContact = (req, res, next) => {
    res.render("contact", {pageTitle: "Contact"});
}