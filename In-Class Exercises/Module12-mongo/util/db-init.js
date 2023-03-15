const sequelize = require("./database-mongo");
const Category = require("../models/category");
const MenuItem = require("../models/menu-item");

const categoryData = require("./categories.json");
const menuItemData = require("./menuitems.json");

//Define Relationships between models
Category.hasMany(MenuItem);
MenuItem.belongsTo(Category);

sequelize
  .sync({force: true})
  // .sync()
  .then((result) => {
    console.log("SUCCESS");
  })
  .then(() => {
    return Category.bulkCreate(categoryData);
  })
  .then((data) => {
    console.log(data);
    return MenuItem.bulkCreate(menuItemData);
  })
  .catch((err) => {
    console.log(err);
  });
