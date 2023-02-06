//import path to construct path file names
const path = require('path');
//import express
const express = require('express');

const ejs= require('ejs');

const expressLayouts = require('express-ejs-layouts')

//import local modules
const menu = require('./data/menu.json')

const homeController = require('./controllers/home-controller')

//initialize app
const app = express();

//load middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts)

app.set('view engine', 'ejs');
app.set('views', 'views');

//define route handlers
//Home Page
app.get("/", homeController.getHome)
//About Page
app.get('/about', homeController.getAbout)
//Burger Page
app.get("/menu/burgers",(req,res,next)=>{
    res.render('menu', {pageTitle: "menu", category: "Burgers", items: menu.burgers, image: "burger.jpg"});
})

//Hotdog Page
app.get("/menu/hotdog",(req,res,next)=>{
    res.render('hotdog', {pageTitle: "menu", category: "Hotdogs", items: menu.hotdogs, image: "hotdog.jpg"});
})
//Contact Page
app.get('/contact',(req,res,next)=>{
    res.render('contact', {pageTitle: "contact"});
})

//launch a server
app.listen(3000);
