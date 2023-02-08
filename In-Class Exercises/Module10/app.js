// Import path to construct path file names
const path = require('path');

// Import npm libraries
const express = require('express');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const menuController = require('./controllers/menu-controller')

// Import local modules
const menu = require('./data/menu.json');
const homeController = require('./controllers/home-controller');

// Initialize our app
const app = express();

// Load middleware to point to static resources
app.use(express.static(path.join(__dirname, 'public')));

// Set the templating engine using app.set
app.set('view engine', 'ejs');

// Tell the application where to find the views
app.set('views', 'views');

app.use(expressLayouts);

// Define route handlers
app.get("/", homeController.getHome);

app.get("/about", homeController.getAbout);


app.get("/contact", (req, res, next) => {
    res.render("contact", {pageTitle: "Contact"});
});

app.get('/menu/burgers', menuController.getMenu);

//return items in a catagory
app.get('/menu/categories/:categoryId/items', menuController.getMenu);
//return a specific menu item
app.get("/menu/:categoryId/items/:itemId", menuController.getMenuItem)

// Launch the server
app.listen(3000);