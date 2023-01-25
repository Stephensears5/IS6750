//import path to construct path file names
const path = require('path');
//import express
const express = require('express');

const ejs= require('ejs');

const expressLayouts = require('express-ejs-layouts')

//import local modules
const menu = require('./data/menu.json')

//initialize app
const app = express();

//load middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts)

app.set('view engine', 'ejs');
app.set('views', 'views');

//define route handlers
//Home Page
app.get("/", (req, res, next)=>{
    res.render('index', {pageTitle: "home"})
})
//About Page
app.get('/about',(req,res,next)=>{
    res.render('about', {pageTitle: "about"});
})
//Burger Page
app.get('/menu/burgers',(req,res,next)=>{
    res.render('menu', {pageTitle: "menu", category: "Burgers", items: menu.burgers});
})
//Contact Page
app.get('/contact',(req,res,next)=>{
    res.render('contact', {pageTitle: "contact"});
})

//launch a server
app.listen(3000);
