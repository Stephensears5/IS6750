const Contact = require('../models/contact');

exports.getHome = (req, res, next) => {
    res.render("index", {pageTitle: "Home"});
}

exports.getAbout = (req, res, next) => {
    res.render("about", {pageTitle: "About"});
}

exports.getContact = (req, res, next) => {
    res.render("contact", {pageTitle: "Contact"});
}

exports.postContact = (req, res, next) => {
    // Retrieve entered values from req.body
    const {name, email, subject, message} = req.body;

    // Create a new contact using the model
    Contact.create({
        name: name,
        email: email,
        subject: subject,
        message: message
    })
    .then((data) => {
        console.log(data);
        res.redirect("/contact");
    })
    .catch((err) => {
        console.log(err);
    })
}