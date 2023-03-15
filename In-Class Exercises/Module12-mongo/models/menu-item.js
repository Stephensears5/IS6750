const { Sequelize, DataTypes } = require("sequelize");
const { default: slugify } = require("slugify");

const sequelize = require("../util/database-mongo");

const MenuItem = sequelize.define("menuItem", {
  // Define Attributes of a contact request
  itemId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  itemName: {
    type: Sequelize.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue("itemName", value);
      this.setDataValue(
        "itemSlug",
        slugify(value, { lower: true, trim: true })
      );
    },
  },
  itemDescription: { type: Sequelize.TEXT, allowNull: false },
  itemPrice: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  }, //.fn("now") or DATATYPES.NOW
  itemImage: { type: Sequelize.STRING, allowNull: false },
  itemSlug: { type: Sequelize.STRING, allowNull: false },
});

module.exports = MenuItem;
