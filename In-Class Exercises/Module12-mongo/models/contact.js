const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../util/database");

const Contact = sequelize.define("contact", {
  // Define Attributes of a contact request
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
  name: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false },
  subject: { type: Sequelize.STRING, allowNull: false },
  message: { type: Sequelize.TEXT, allowNull: false },
  date: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW},//.fn("now") or DATATYPES.NOW
  response: { type: Sequelize.TEXT },
  responseDate: { type: Sequelize.STRING },
});

module.exports = Contact
