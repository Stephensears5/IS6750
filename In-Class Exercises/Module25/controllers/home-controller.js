const Contact = require('../models/contact');

exports.getHome = (req, res, next) => {
    res.locals.pageTitle = "Home";
    res.locals.messages = req.flash('success');
    res.render("index");
}

exports.getAbout = (req, res, next) => {
    res.render("about", {pageTitle: "About"});
}

exports.getContact = (req, res, next) => {
    res.render("contact", {pageTitle: "Contact", messages: req.flash('success')});
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
        req.flash('success', 'Thank you!  Your request has been recorded.')
        res.redirect("/contact");
    })
    .catch((err) => {
        console.log(err);
    })
}