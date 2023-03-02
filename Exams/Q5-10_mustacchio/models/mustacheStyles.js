const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../util/database");
const slugify = require("slugify");

const MustacheStyles = sequelize.define("styles", {
  // Define Attributes of a contact request
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING(50),
    allowNull: false,
    set(value) {
        this.setDataValue("title", value);
        //add the slug
        this.setDataValue("titleSlug", slugify(value, {lower: true, trim: true}))
      },
    validate: {
        contains: 'jpg',
        contains: 'png'
    }
  },
  imageUrl: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.STRING, allowNull: false},
  titleSlug: {type: Sequelize.STRING, allowNull: false}
});

module.exports = MustacheStyles;
