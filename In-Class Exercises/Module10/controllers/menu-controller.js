const menu = require("../data/menu.json");
const Menu = require("../models/menu");

exports.getMenu = (req, res, next) => {
  const categoryId = req.params.categoryId;

  //get all categories for side menu
  Menu.fetchAllCategories()
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(error);
    });

//   if (menu[categoryId]) {
//     res.render("menu", {
//       pageTitle: "Menu",
//       category: categoryId,
//       items: menu[category].items,
//       image: menu[category].image,
//     });
//   } else {
//     res.sendStatus("<h1>Oops! no page found</h1>");
//   }
};

exports.getMenuItem = (req, res, next) => {
  const id = parseInt(req.params.id);
  const category = req.params.category;
  const item = menu[category].items.find((item) => item.id === id);
  console.log(item);
  res.render("menu-item", {
    pageTitle: item.name,
    category: category,
    item: item,
    image: item.img,
  });
};
