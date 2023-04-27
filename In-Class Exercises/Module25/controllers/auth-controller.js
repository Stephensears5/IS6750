const bcrypt = require("bcryptjs");
const User = require("../models/user-mongoose");

exports.getSignup = (req, res) => {
  res.render("auth/signup", {
    pageTitle: "Sign Up",
    messages: req.flash("error"),
  });
};

exports.getLogin = (req, res) => {
  res.render("auth/login", {
    pageTitle: "Log In",
    messages: req.flash("error"),
  });
};

exports.postSignup = (req, res, next) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash(
          "error",
          "E-Mail exists already, please pick a different one."
        );
        console.log("user already exists!");
        return res.redirect("/auth/signup");
      }
      const user = new User({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      });
      return user.save().then((result) => {
        res.redirect("/auth/login");
      });
    })

    .catch((err) => {
      console.log(err);
    });
};

exports.findUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body)
  User.findOne({ email: email }).then((user) => { 
    if (!user) {
      req.flash("error", "Invalid email or password.");
      return res.redirect("/auth/login");
    }
    bcrypt.compare(password, user.password).then((doMatch) => {
      res.locals.doMatch = doMatch;
      res.locals.user = user;
      //call the next function
      next();
    })
    .catch(err => { console.log(err)});
  });
};

exports.processLogin = (req, res, next) => {
  let doMatch = res.locals.doMatch;
  let user = res.locals.user;

  if (doMatch && user) {
    req.session.isLoggedIn = true;
    req.session.user = user;
    return req.session.save((err) => {
      console.log(err);
      if (!err) {
        req.flash("success", `Welcome, ${user.firstname}!`);
      }
      res.redirect("/");
    });
  }
  req.flash("error", "Invalid email or password.");
  res.redirect("/auth/login");
}

// exports.postLogin = (req, res, next) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   User.findOne({ email: email })
//     .then((user) => {
//       if (!user) {
//         req.flash("error", "Invalid email or password.");
//         return res.redirect("/auth/login");
//       }
//       bcrypt
//         .compare(password, user.password)
//         .then((doMatch) => {
//           if (doMatch) {
//             req.session.isLoggedIn = true;
//             req.session.user = user;
//             return req.session.save((err) => {
//               console.log(err);
//               if (!err) {
//                 req.flash("success", `Welcome, ${user.firstname}!`);
//               }
//               res.redirect("/");
//             });
//           }
//           req.flash("error", "Invalid email or password.");
//           res.redirect("/auth/login");
//         })
//         .catch((err) => {
//           console.log(err);
//           res.redirect("/auth/login");
//         });
//     })
//     .catch((err) => console.log(err));
// };

exports.getLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
