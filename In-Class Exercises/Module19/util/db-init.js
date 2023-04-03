const sequelize = require('./database');

const Contact = require('../models/contact');
const Category = require('../models/category');
const MenuItem = require('../models/menu-item');

const categoryData = require('./categories.json');
const menuItemData = require('./menuitems.json');

// Define relationships between models
Category.hasMany(MenuItem);
MenuItem.belongsTo(Category);



// Sync the model(s) with the database

sequelize.sync({force: true})
.then((data) => {
    console.log("SUCCESS!  ", data);
})
.then(() => {
    // Bulk insert categories
    return Category.bulkCreate(categoryData);
})
.then((data) => {
    console.log(data);
    // Bulk insert Menuitems
    return MenuItem.bulkCreate(menuItemData);
})
.catch((error) => {
    console.log("An error occurred!:  ", error);
});