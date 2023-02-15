const mysql = require('mysql2');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('5750stevesears', '5750stevesears', 'A01234875', {dialect: 'mysql', host: 'fadel-5750-sp23.ckm1cfmd3i4j.us-west-2.rds.amazonaws.com'});

module.exports = sequelize;

