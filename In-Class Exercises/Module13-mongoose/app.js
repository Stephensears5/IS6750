// Import path to construct path file names
const path = require('path');

// Import npm libraries
const express = require('express');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');

// Import local modules

const homeController = require('./controllers/home-controller');
const menuController = require('./controllers/menu-controller');
const menuRoutes = require('./routes/menu-routes');
const homeRoutes = require('./routes/home-routes');
const sequelize = require('./util/database');
const Category = require('./models/category');
const MenuItem = require('./models/menu-item');
const mongoConnect = require('./util/database-mongo').mongoConnect;
const mongoose = require('mongoose');

// Initialize our app
const app = express();

// Load middleware to point to static resources
app.use(express.static(path.join(__dirname, 'public')));

// Load middleware to parse request bodies
app.use(express.urlencoded({extended: false}));

// Set the templating engine using app.set
app.set('view engine', 'ejs');

// Tell the application where to find the views
app.set('views', 'views');

app.use(expressLayouts);

// Define route handlers

// menu routes
app.use("/menu", menuRoutes);
// home routes
app.use(homeRoutes);

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

mongoose.connect(
    "mongodb+srv://new_user_1:xqu6BNQNUGmQyskB@cluster0.7atvcn4.mongodb.net/retrodiner?retryWrites=true&w=majority"
    ).then(app.listen(3000)).catch(err=>{console.log(err)})

