// Import path to construct path file names
const path = require('path');

// Import npm libraries
const express = require('express');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const homeRoutes = require('./routes/homeRoutes')
// Import local modules

const homeController = require('./controllers/homeController');

// Initialize our app
const app = express();

// Load middleware to point to static resources
app.use(express.static(path.join(__dirname, 'public')));

//Load Middleware to parse request body
app.use(express.urlencoded({extended: false}))

// Set the templating engine using app.set
app.set('view engine', 'ejs');

// Tell the application where to find the views
app.set('views', 'views');

app.use(expressLayouts);

app.use(homeRoutes)


// Launch the server
app.listen(3000);