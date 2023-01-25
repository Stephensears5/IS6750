const http = require("http");
const bodyParser = require("body-parser");
const express = require("express");
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const userData = require('./routes/add-user');
const usersRoutes = require('./routes/users');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use('/admin', userData.routes)
app.use('/', usersRoutes);
app.use(shopRoutes);


app.use((req,res,next) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found'});
});

const server = http.createServer(app);
server.listen(3000);
