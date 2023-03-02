// Import path to construct path file names
const path = require('path');

// Import npm libraries
const express = require('express');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const homeRoutes = require('./routes/homeRoutes')
const stylesRoutes = require('./routes/stylesRoutes')
const sequelize = require("./util/database");
const MustacheStyles = require("./models/mustacheStyles");
// Import local modules

const homeController = require('./controllers/homeController');
const stylesController = require('./controllers/stylesController')

// Initialize our app
const app = express();

// Load middleware to point to static resources
app.use(express.static(path.join(__dirname, 'public/')));

//Load Middleware to parse request body
app.use(express.urlencoded({extended: false}))

// Set the templating engine using app.set
app.set('view engine', 'ejs');

// Tell the application where to find the views
app.set('views', 'views');

app.use(expressLayouts);

app.use(homeRoutes)
app.use('/styles', stylesRoutes)



//Define Relationships between models

sequelize
  // .sync({force: true})
  .sync()
  .then((result) => {
    console.log("SUCCESS");
  })
  .then(() => {
    return MustacheStyles.bulkCreate(MustacheStyles);
  })
  // .then(x => {
  //   return stylesController.bulkAddStyles();
  // })
  .then(x => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
// Launch the server
// app.listen(3000);