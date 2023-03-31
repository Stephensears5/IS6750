const User = require("../models/user-mongoose");

const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  //   let message = req.flash("error");
  //   if (message.length > 0) {
  //     message = message[0];
  //   } else {
  //     message = null;
  //   }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: req.session.isLoggedIn,
    messages: req.flash("error"),
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: req.session.isLoggedIn,
    messages: req.flash("error"),
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid Email or Password");
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            req.session.name = user.firstname
            return req.session.save((err) => {
              console.log(user.firstname);
              const str = user.firstname;
              const str2 = str.charAt(0).toUpperCase() + str.slice(1);
              req.flash('name', str2)
              return res.redirect("/");
            });
          } 
            req.flash("error", "Invalid Email or Password");
            return res.redirect("/login");
          
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  console.log("postSignup", firstName, lastName);

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash(
          "error",
          "E-Mail exists already, please pick a different one."
        );
        return res.redirect("/auth/signup");
      }
      const user = new User({
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
      });
      res.redirect("/");
      return user.save();
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
