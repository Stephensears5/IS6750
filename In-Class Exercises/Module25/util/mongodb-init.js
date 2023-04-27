const mongoose = require("mongoose");
const MenuItem = require("../models/menu-item-mongoose");
const Category = require("../models/category-mongoose");
const MenuItemData = require("./menuitems-mongo.json");
const CategoryData = require("./categories-mongo.json");

//  Define variables for holding menuitems and categories arrays
let menuitems, categories;

mongoose
  .connect(
    "" //Put your connection string here
  )
  .then(() => {
    // Bulk create all menu item data
    return MenuItem.create(MenuItemData);
  })
  .then((result) => {
    // Log menu item data
    console.log(result);
    // Save data in variable for later use
    menuitems = result;
    // Bulk create all category data
    return Category.create(CategoryData);
  })
  .then((result) => {
    // Log category data
    console.log(result);
      // Save data in variable for later use
    categories = result;
  })
  .then(() => {
    // Iterate through categories and menu items to add item ids to their respective category (four items per category)
    let itemcounter = 0;
    let categorycounter = 1;

    for (cat of categories) {
      while (itemcounter < categorycounter * 4) {
        cat.items.push(menuitems[itemcounter]._id);
        itemcounter++;
      }
      cat.save();
      categorycounter++;
    }
  })
  .catch((err) => {
    console.log(err);
  });
