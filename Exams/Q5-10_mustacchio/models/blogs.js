const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../util/database");
const slugify = require("slugify");

const Blogs = sequelize.define("blogPosts", {
  // Define Attributes of a contact request
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    require: true,
  },
  title: {
    type: Sequelize.STRING(50),
    allowNull: false,
    require: true,
    set(value) {
      this.setDataValue("title", value);
      //add the slug
      this.setDataValue(
        "titleSlug",
        slugify(value, { lower: true, trim: true })
      );
    },
  },
  summary: {
    type: Sequelize.STRING(350),
    allowNull: false,
    require: true,
  },
  content: {
    type: Sequelize.STRING,
    require: true
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    require: true,
    validate: {
      contains: ["jpg","png"]

    },
  },
  postDate: { type: Sequelize.DATE, allowNull: false, require: true },
  titleSlug: { type: Sequelize.STRING, allowNull: false, require: true },
});

module.exports = Blogs;
