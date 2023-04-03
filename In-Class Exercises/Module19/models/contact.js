const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Contact = sequelize.define('contact', {
    // Define attributes of a contact request
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    subject: {
        type: Sequelize.STRING,
        allowNull: false
    },
    message: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    date:{
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    response: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    responseDate: {
        type: Sequelize.DATE,
        allowNull: true
    }
});

module.exports = Contact;