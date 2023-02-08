const menu = require("../data/menu.json");
const Menu = require("../models/menu");

exports.getMenu = (req, res, next) => {
  const categoryId = req.params.categoryId;
  let categories, selectedCategory;

  // Get all categories for side menu
  Menu.fetchAllCategories()
    .then(([retrievedCategories]) => {
      console.log(retrievedCategories);
      categories = retrievedCategories;
      selectedCategory = categories.find(
        (x) => x.catId === parseInt(categoryId)
      );
    })
    .then(() => {
      return Menu.fetchItemsInCategory(categoryId);
    })
    .then(([items]) => {
      console.log(items);
      if (items) {
        res.render("menu", {
          pageTitle: "Menu",
          category: selectedCategory,
          categories: categories,
          items: items
        });
      } else {
        res.send("<h1>Oops!  No page found.</h1>");
      }
    })
    .catch((err) => console.log(err));

  // if (menu[category]) {
  //      res.render("menu", {pageTitle: "Menu", category: category, items: menu[category].items, image: menu[category].image });
  // } else {
  //     res.send("<h1>Oops!  No page found.</h1>")
  // }
};

exports.getMenuItem = (req, res, next) => {
  // Retrieve the parameter values from req.params
  let { categoryId, itemId } = req.params;
  console.log("itemID", itemId)

  // let id = req.params.id;
  // let category = req.params.category;
    let selectedItem;
  Menu.fetchItemsInCategory(categoryId).then(([retrievedItems]) => {
      selectedcategories = retrievedItems.find(x => x.itemId === parseInt(itemId));
      return Menu.fetchItemById(itemId);
  })
  .then(([data]) => {
    let item = data[0];
    if (item) {
        res.render("menu-item", {
          pageTitle: item.itemName,
          category: selectedCategory,
          item: item,
        });
      } else {
        res.send("<h1>Sorry, item not found</h1>");
      }
  }).catch(err => console.log(error));

  // Change the id to an int so it matches the type saved in the database
//   id = parseInt(id);

  // Use the built-in JavaScript find function to find the item with the id
//   const item = menu[category].items.find((item) => item.id === id);

  //Render the view passing in the data if an item was found
  
};
