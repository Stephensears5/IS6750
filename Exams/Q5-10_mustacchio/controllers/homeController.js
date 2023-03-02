exports.getHome = (req, res, next) => {
    res.render("index", { pageTitle: "Home" });
  };

exports.getAbout = (req, res, next) => {
  res.render("about", {pageTitle:"About"});
}

