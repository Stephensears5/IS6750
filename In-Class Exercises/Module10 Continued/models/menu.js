const db = require('../util/database');

class Menu {

// Code that retrieves/writes data to the database

//Function that retrieves all categories from database
static fetchAllCategories() {
    return db.execute("SELECT * FROM categories;");
}

// Function that retrieves all items in a category
static fetchItemsInCategory(catId) {
    return db.execute("SELECT * FROM menuitems WHERE catId = ?", [catId]);
}

static fetchItemById(id) {
    return db.execute("Select * FROM menuItems m JOIN categories c on m.catId = c.catId WHERE itemId = ?", [id])
}

}

module.exports = Menu;