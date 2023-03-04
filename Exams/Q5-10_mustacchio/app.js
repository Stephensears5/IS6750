// Import path to construct path file names
const path = require('path');

// Import npm libraries
const express = require('express');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const sequelize = require("./util/database");
const morgan = require('morgan');
const fs = require('fs');


//Routes
const homeRoutes = require('./routes/homeRoutes')
const stylesRoutes = require('./routes/stylesRoutes')
const blogRoutes = require('./routes/blogRoutes')
const contactRoutes = require('./routes/contactRoutes')
// Import local modules

const homeController = require('./controllers/homeController');
const stylesController = require('./controllers/stylesController');
const blogController = require('./controllers/blogController');
const MustacheStyles = require("./models/mustacheStyles");

//Logs
const logRequests = require('./middleware');



// Initialize our app
const app = express();

// Load middleware to point to static resources
app.use(express.static(path.join(__dirname, 'public/')));
var accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/logRequests.txt'), { flags: 'a' })
 

//Load Middleware to parse request body
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev', {stream: accessLogStream}))

// Set the templating engine using app.set
app.set('view engine', 'ejs');

// Tell the application where to find the views
app.set('views', 'views');

app.use(expressLayouts);

app.use(homeRoutes)
app.use('/styles', stylesRoutes)
app.use(blogRoutes)
app.use(contactRoutes)
app.use(logRequests);

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
  // .then(x => {
  //   return blogController.bulkAddBlogPosts();
  // })
  .then(x => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
// Launch the server
// app.listen(3000);