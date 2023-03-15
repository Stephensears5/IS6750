const Contact = require("../models/contact");

exports.getHome = (req, res, next) => {
  res.render("index", { pageTitle: "Home" });
};

exports.getAbout = (req, res, next) => {
  res.render("about", { pageTitle: "About" });
};

exports.getContact = (req, res, next) => {
  res.render("contact", { pageTitle: "Contact" });
};

exports.postContact = (req, res, next) => {
  console.log("req body", req.body);
  const name = req.body.name;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;

  Contact.create({
    name: name,
    email: email,
    subject: subject,
    message: message,
  })
    .then((result) => {
      console.log("Contact Message Created");
      res.redirect("/contact");
    })
    .catch((err) => console.log(err));
};
