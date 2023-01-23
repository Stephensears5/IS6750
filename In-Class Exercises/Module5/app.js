const fs = require('fs');

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// const tempMiddleware = (req, res, next) => {
//  console.log("Authenticate the request.");
//  console.log("Query the Database");
//  console.log("Prepare the response");
//  next();
// }

// const authenticateUser = (req, res, next) => {
//     console.log("Authenticate the request.")
//     next();
// }
// const queryDatabase = (req, res, next) => {
//     console.log("Query the Database.")
//     next();
// }
// const prepResponse = (req, res, next) => {
//     console.log("Prepare the Response.");
//     next();
// }

// //Request Handler Function
// const tempHandler = (req, res, next) => {
//     console.log("Request Method", req.method);
//     console.log("Request Path", req.path);
//     res.send('<h1>Hello World!</h1>')
// }

// app.use(authenticateUser);

// app.get('/', queryDatabase, prepResponse, tempHandler)
// app.get('/about', (req, res) => {
// res.send('<h1>About Us!</h1>');
// })
// app.get('/contact', (req,res) => {
// res.send('<h1>Contact Information</h1>')
// })

const logRequests = (req, res, next) => {
    const date = new Date()
    const message = date.toLocaleString() + " was submitted with this path: " + req.path + "and method: " + req.method + "\r\n";
    fs.appendFile('message.txt', message, (err) => {
        if(err){
            throw err
            console.log('The "Data to append" is invalid"', err)
        } 
        
    })
    next();
}
app.use(logRequests);
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);
