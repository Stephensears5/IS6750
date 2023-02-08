const db = require('../util/database');

class Menu {
    //code that retrieves/writes data to the database

    //function that retrieves all catagories from database
    static fetchAllCategories() {
        return db.execute('SELECT * FROM categories;');
    }

    //function that retrieves all items in a catagory
    static fetchItemsInCategory(categoryId){
        return db.execute('SELECT * from menuitems WHERE catId = ?', [categoryId])
    }
}

module.exports = Menu;