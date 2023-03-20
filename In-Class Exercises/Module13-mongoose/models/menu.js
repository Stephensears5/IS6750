

const mongodb = require('mongodb');
const getDb = require('../util/database-mongo').getDb;

class Menu {

// Code that retrieves/writes data to the database

//Function that retrieves all categories from database
static fetchAllCategories() {
   const db = getDb();

   // Query the menu collection
   return db.collection('menu').find().toArray()
   .then(categories => {
    console.log(categories);
    return categories;
   })
   .catch(err => console.log(err));
}

// Function that retrieves all items in a category
static fetchItemsInCategory(catId) {
    return db.execute("SELECT * FROM menuitems WHERE catId = ?", [catId]);
}

// Function that retrieves a specific item by id
static fetchItemById(itemId) {
    return db.execute("SELECT * FROM menuitems m JOIN categories c ON m.catId = c.catId WHERE itemId = ?", [itemId]);
}

}

module.exports = Menu;