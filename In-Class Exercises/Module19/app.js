// Import path to construct path file names
const path = require('path');

// Import npm libraries
const express = require('express');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');

// Import local modules

const homeController = require('./controllers/home-controller');
const menuController = require('./controllers/menu-controller');
const errorController = require('./controllers/error')
const menuRoutes = require('./routes/menu-routes');
const homeRoutes = require('./routes/home-routes');
const authRoutes = require('./routes/auth')
const sequelize = require('./util/database');
const Category = require('./models/category');
const MenuItem = require('./models/menu-item');
// const mongoConnect = require('./util/database-mongo').mongoConnect;
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const User = require('./models/user-mongoose');
const flash = require('connect-flash');

const MONGODB_URI =
  'mongodb+srv://new_user_1:xqu6BNQNUGmQyskB@cluster0.7atvcn4.mongodb.net/retrodiner'; // Replace with your db connection string

// Initialize our app
const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
  });

// Load middleware to point to static resources
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: store
    })
  );

// Load middleware to parse request bodies
app.use(express.urlencoded({extended: false}));

// Set the templating engine using app.set
app.set('view engine', 'ejs');

// Tell the application where to find the views
app.set('views', 'views');

app.use(expressLayouts);
app.use(flash());

// Define route handlers

// menu routes
app.use("/menu", menuRoutes);
// home routes
app.use(homeRoutes);
app.use(authRoutes)

app.use((req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    User.findById(req.session.user._id)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });

  app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    // res.locals.csrfToken = req.csrfToken();
    console.log(res.locals.isAuthenticated)
    next();
  })


app.get('/500', errorController.get500);
app.use(errorController.get404);
app.use((error, req, res, next) => {
  // res.status(error.httpStatusCode).render(...);
  // res.redirect('/500');
  res.status(500).render('500', {
    pageTitle: 'Error!', 
    path: '/500',
    isAuthenticated: req.session.isLoggedIn
  })
}) 
// sequelize.sync({force: true})
// .then((data) => {
//     console.log("SUCCESS!  ", data);
// })
// .catch((error) => {
//     console.log("An error occurred!:  ", error);
// });

// Define data relationships
Category.hasMany(MenuItem);
MenuItem.belongsTo(Category);

// Launch the server

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

