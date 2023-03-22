const User = require("../models/user");

exports.getLogin = (req, res, next) => {
        // const isLoggedIn = req.get('Cookie').split(';')[0].split('=')[1].trim();
         console.log(req.session)
        res.render('auth/login', {
          path: '/login',
          pageTitle: 'Login', 
          isAuthenticated: req.session.isLoggedIn
        });
  };

  exports.postLogin = (req,res,next) => {
    // res.setHeader('Set-Cookie', 'isLoggedIn=true; Max-Age=10');
    User.findById("641a7cd3ea4f839af40f610a") //Replace this with your own user ID
    .then((user) => {
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save((err) => {
            console.log(err);
            res.redirect('/');
        });
    })
    .catch((err) => console.log(err));
    
  }

  exports.postLogout = (req, res, next) => {
    req.session.destroy((err)=>{
        console.log(err);
        res.redirect('/');
    });
  }