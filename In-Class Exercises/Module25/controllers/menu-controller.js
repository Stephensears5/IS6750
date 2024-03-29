const menu = require('../data/menu.json');
const Menu = require('../models/menu');
const Category = require('../models/category-mongoose');
const MenuItem = require('../models/menu-item-mongoose');

// exports.getMenu = (req, res, next) => {
//     const catSlug = req.params.catSlug;
//     let categories, selectedCategory;
//     // Get all categories for side menu
//     Category.findAll()
//         .then((retrievedCategories) => {
//             //console.log("All categories:", JSON.parse(JSON.stringify(retrievedCategories)));
//             categories = retrievedCategories;
//             selectedCategory = categories.find(cat => cat.catSlug.toLowerCase() === catSlug.toLowerCase());
//             console.log("Selected Category: ", selectedCategory);
//         })
//         .then(() => {
//             //Retrieve the items in the selected category
//             return MenuItem.findAll({ where: { categoryCatId: selectedCategory.catId } })
//         })
//         .then((items) => {
//             console.log("Items:", items);
//             if (items) {
//                 res.render("menu", { pageTitle: "Menu", category: selectedCategory, items: items, categories: categories });
//             } else {
//                 res.send("<h1>Oops!  No page found.</h1>")
//             }
//         })
//         .catch(err => console.log(err));


// };

// Retrieve menu data from database
exports.getMenu = async (req, res, next) => {
    try {
        const categories = await Category.find().populate('items');
        console.log("Categories are: ", categories);
        categories.forEach(category => { console.log(category.items) });

        // Store category data for next handler functions
        res.locals.categories = categories;

        // Call the next handler function
        next();
    } catch (err) {
        next(err);
    }

}

exports.getItemsByCategory = (req, res, next) => {
    const catSlug = req.params.catSlug;
    try {
        // Retreive category data from res.locals
        const categories = res.locals.categories;
        const selectedCategory = categories.find(cat => cat.slug.toLowerCase() === catSlug.toLowerCase());
        console.log("Selected Category: ", selectedCategory);
        if (!selectedCategory) {
            throw new Error("That category doesn't exist!");
        }
        res.locals.selectedCategory = selectedCategory;
        next();
    }
    catch (err) {
        next(err);
    }
}

// Async/await version
exports.renderMenu = async (req, res, next) => {
   

    // put risky code in try/catch block
    try {
        // Retreive category data from res.locals
        const categories = res.locals.categories;
        const selectedCategory = res.locals.selectedCategory;
       
        items = selectedCategory.items;
        console.log("Items:", items);
        if (items) {
            res.render("menu", { pageTitle: "Menu", category: selectedCategory, items: items });
        } else {
            throw new Error("Items not found!")
        }
    } catch (err) {
        next(err);
    }

};

exports.getMenuItem = (req, res, next) => {
    // Retrieve the parameter values from req.params
    const catSlug = req.params.catSlug;
    const itemSlug = req.params.itemSlug;
    let categories, selectedCategory;
    // Get all categories for side menu
    Category.find()
        .then((retrievedCategories) => {
            console.log("All categories:", JSON.parse(JSON.stringify(retrievedCategories)));
            categories = retrievedCategories;
            selectedCategory = categories.find(cat => cat.slug.toLowerCase() === catSlug.toLowerCase());
            console.log("Selected Category: ", selectedCategory);
            return MenuItem.findOne({ slug: itemSlug })
        })
        .then((item) => {
            console.log("Item is: ", item);
            if (item) {
                res.render("menu-item", { pageTitle: item.itemName, category: selectedCategory, item: item, categories: categories });
            } else {
                res.send("<h1>Sorry, item not found</h1>");
            }
        })
        .catch((err) => {
            next(err);
        })




    // let itemId = parseInt(req.params.itemId);
    // let catId = parseInt(req.params.categoryId);
    // let categories, selectedCategory;
    // Menu.fetchAllCategories()
    // .then(([retrievedCategories]) => {
    //     categories = retrievedCategories;
    //     selectedCategory = categories.find(cat => cat.catId === catId);
    //     return Menu.fetchItemById(itemId)
    // })   
    // .then(([data]) => {
    //     console.log("Data is: ", data);
    //     let item = data[0];
    //     if (item) {
    //         res.render("menu-item", {pageTitle: item.itemName, category: selectedCategory, item: item, categories: categories});
    //     } else {
    //         res.send("<h1>Sorry, item not found</h1>");
    //     }
    // })



}