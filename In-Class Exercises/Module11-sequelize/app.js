// Import path to construct path file names
const path = require('path');

// Import npm libraries
const express = require('express');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const menuRoutes = require('./routes/menu-routes')
const homeRoutes = require('./routes/home-routes')
// Import local modules

const homeController = require('./controllers/home-controller');
const menuController = require('./controllers/menu-controller');

// Initialize our app
const app = express();

// Load middleware to point to static resources
app.use(express.static(path.join(__dirname, 'public')));

// Set the templating engine using app.set
app.set('view engine', 'ejs');

// Tell the application where to find the views
app.set('views', 'views');

app.use(expressLayouts);

app.use('/menu', menuRoutes)
app.use(homeRoutes)


// Launch the server
app.listen(3000);