const Contacts = require("../models/contact");

exports.getContact = (req, res, next) => {
  res.render("contact", { pageTitle: "Contact" });
};

exports.postContact = (req, res, next) => {
//   console.log("req body", req.body);
  const name = req.body.name;
  const address = req.body.address;
  const email = req.body.email;
  const phone = req.body.phone;
  const message = req.body.message;
  const datePosted = new Date();

  Contacts.create({
    name: name,
    address: address,
    email: email,
    phone: phone,
    message: message,
    datePosted: datePosted,
  })
    .then((result) => {
      console.log("Contact Message Created");
      res.redirect("/contact/thanks");
    })
    .catch((err) => console.log(err));
};

exports.getContacts = async (req, res, next) => {
  try {
    contacts = await Contacts.findAll({ where: { response: null } });
    // console.log("Selected contacts: ", contacts);
    if (contacts) {
      res.render("contact-list", {
        pageTitle: "Contact Requests",
        items: contacts,
      });
    } else {
      res.send("<h1>Oops!  No page found.</h1>");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getThanks = (req, res, next) => {
  res.render("thanks", { pageTitle: "Thanks" });
};

exports.getContactItem = async (req, res, next) => {
  const contactID = req.params.id;
//   console.log(req.params.id);
  try {
    contact = await Contacts.findOne({
      where: { id: contactID },
    });
    if (contact) {
      res.render("contact-respond", {
        pageTitle: "Contact Request",
        items: contact,
      });
    }
  } catch (err) {
    console.log("An Error Occured in SylesController getBlogItem", err);
  }
};

exports.bulkAddBlogPosts = (req, res, next) => {
  Blogs.bulkCreate(bulkPosts)
    .then((result) => {
      console.log("Blog Posts Created!");
    })
    .catch((err) => console.log(err));
};

exports.postResponse = async (req, res, next) => {
  const id = req.params.id;
  const response = req.body.response;
  const responseDate = new Date();

  Contacts.update(
    { response: response, dateResponded: responseDate },
    { where: { id: id } }
  )
    .then((result) => {
      console.log("Successfully updated record");
      res.redirect('/contacts')
    })
    .catch((err) => console.log(err));
};
