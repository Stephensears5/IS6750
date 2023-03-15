const menu = require("../data/menu.json");
const Menu = require("../models/menu");
const Category = require("../models/category");


exports.getMenu = async (req, res, next) => {
  const catSlug = req.params.catSlug;
  try{
    const categories = await Menu.fetchAllCategories();
    console.log(catSlug.toLowerCase())
    console.log(categories);
    const selectedCategory = categories.find(cat => cat.slug.toLowerCase() === catSlug.toLowerCase())
    console.log(selectedCategory);
    console.log("SelectedCategory: ", selectedCategory);
    const items = selectedCategory.burgers.items;
    console.log("items", items);
    if(items){
      res.render("menu", {pageTitle: "menu", category: selectedCategory, items: items, categories: categories})
    }else{
      res.send("<h1>Oops! No Page Found. </h1>")
    }
  }catch(err){
    console.log(err);
  }
  // Category.findAll()
  //   .then((categories) => {
  //       console.log(JSON.parse(JSON.stringify(categories)));
  //       // res.render("menu", {pageTitle: "Menu", category: selectedCategory, items: items, categories: categories });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // let categories, selectedCategory;
  // // Get all categories for side menu
  // Menu.fetchAllCategories()
  // .then(([retrievedCategories]) => {
  //      console.log("All categories:", retrievedCategories);
  //     categories = retrievedCategories;
  //     selectedCategory = categories.find(cat => cat.catId === categoryId);
  //     console.log("Selected Category: ", selectedCategory);
  // })
  // .then(() => {
  //     //Retrieve the items in the selected category
  //     return Menu.fetchItemsInCategory(categoryId);
  // })
  // .then(([items]) => {
  //     console.log("Items:", items);
  //     if (items) {
  //         res.render("menu", {pageTitle: "Menu", category: selectedCategory, items: items, categories: categories });
  //    } else {
  //        res.send("<h1>Oops!  No page found.</h1>")
  //    }
  // })
  // .catch(err => console.log(err));
};

exports.getMenuItem = (req, res, next) => {
  // Retrieve the parameter values from req.params
  let itemId = parseInt(req.params.itemId);
  let catId = parseInt(req.params.categoryId);
  let categories, selectedCategory;
  Menu.fetchAllCategories()
    .then(([retrievedCategories]) => {
      categories = retrievedCategories;
      selectedCategory = categories.find((cat) => cat.catId === catId);
      return Menu.fetchItemById(itemId);
    })
    .then(([data]) => {
      console.log("Data is: ", data);
      let item = data[0];
      if (item) {
        res.render("menu-item", {
          pageTitle: item.itemName,
          category: selectedCategory,
          item: item,
          categories: categories,
        });
      } else {
        res.send("<h1>Sorry, item not found</h1>");
      }
    });
};
