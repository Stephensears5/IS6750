const { Sequelize } = require("sequelize");

const sequelize = require("../util/database");

const Contact = sequelize.define("contact", {
  // Define Attributes of a contact request
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    require: true,
  },
  name: {
    type: Sequelize.STRING(50),
    require: true 
  },
  address: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    require: true, 
    validate: {
        isEmail: true
    }
  },
  phone: {
    type: Sequelize.STRING
  },
  message:{
    type: Sequelize.STRING,
    require: true
  },
  datePosted:{
    type: Sequelize.DATE,
    require: true
  },
  response:{
    type: Sequelize.STRING
  },
  dateResponded:{
    type: Sequelize.DATE
  },
  shortMessage: {
    type: Sequelize.VIRTUAL,
    get() {
        return `${this.message === undefined ? "" : this.message.split(/\s+/).slice(0, 10).join(" ")}...`
    },
    set(value){
        throw new Error('Do not try to set the shortMessage value!')
    }

    }
  }
);

module.exports = Contact;
