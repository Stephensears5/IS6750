// Import path to construct path file names
const path = require('path');

// Import npm libraries
const express = require('express');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

// Import local modules

const homeController = require('./controllers/home-controller');
const menuController = require('./controllers/menu-controller');
const errorController = require('./controllers/error-controller');
const menuRoutes = require('./routes/menu-routes');
const homeRoutes = require('./routes/home-routes');
const authRoutes = require('./routes/auth-routes');
const apiRoutes = require('./routes/api-routes');
const sequelize = require('./util/database');
const Category = require('./models/category');
const MenuItem = require('./models/menu-item');
//const mongoConnect = require('./util/database-mongo').mongoConnect;
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
require('dotenv').config();


// Database connection string
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.b7d0m.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`// Replace with your db connection string

// Initialize our app
const app = express();

// Initialize session store
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
  });

  // Set the templating engine using app.set
app.set('view engine', 'ejs');

// Tell the application where to find the views
app.set('views', 'views');

// Load middleware to point to static resources
app.use(express.static(path.join(__dirname, 'public')));

// Load middleware to parse request bodies from html forms
app.use(express.urlencoded({extended: false}));

// Load middleware to parse request bodies from json
app.use(express.json())

app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: store
    })
  );

  // Load the connect flash middleware
  app.use(flash());


app.use(expressLayouts);

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
  });

// Define route handlers

// auth routes
app.use("/auth", authRoutes);
// menu routes
app.use("/menu", menuRoutes);
// api routes
app.use("/api", apiRoutes);

// home routes
app.use(homeRoutes);

// error routes
app.use(errorController.generalError);

// sequelize.sync({force: true})
// .then((data) => {
//     console.log("SUCCESS!  ", data);
// })
// .catch((error) => {
//     console.log("An error occurred!:  ", error);
// });

// Define data relationships
//Category.hasMany(MenuItem);
//MenuItem.belongsTo(Category);

// Launch the server
mongoose.connect(
    MONGODB_URI
).then(() => {
  app.listen(process.env.PORT || 3000);
})
