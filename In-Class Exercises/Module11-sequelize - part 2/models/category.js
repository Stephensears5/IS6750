const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../util/database");

const slugify = require("slugify");

const Category = sequelize.define("category", {
  // Define Attributes of a contact request
  catId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  catName: {
    type: Sequelize.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue("catName", value);
      //add the slug
      this.setDataValue("catSlug", slugify(value, {lower: true, trim: true}))
    },
  },
  catImage: { type: Sequelize.STRING(500), allowNull: false },
  catSlug: { type: Sequelize.STRING, allowNull: false },
});

module.exports = Category;
