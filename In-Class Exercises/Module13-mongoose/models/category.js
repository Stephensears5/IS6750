const Sequelize = require('sequelize');
const slugify = require('slugify');

const sequelize = require('../util/database');

const Category = sequelize.define('category', {
    // Define attributes of a category
    catId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    catName: {
        type: Sequelize.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('catName', value);
            // Add the slug
            this.setDataValue('catSlug', slugify(value, {lower: true, trim: true}))
        }
    },
    catImage: {
        type: Sequelize.STRING(500),
        allowNull: false
    },
    catSlug: {
        type: Sequelize.STRING
    }
});

module.exports = Category;