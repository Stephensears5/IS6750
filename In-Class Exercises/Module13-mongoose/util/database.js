const Sequelize  = require('sequelize');

const sequelize = new Sequelize('5750kellyfadel_retrodinersequelize', '5750kellyfadel', 'A00547972', {
    dialect: 'mysql',
    host: 'fadel-5750-sp23.ckm1cfmd3i4j.us-west-2.rds.amazonaws.com'
});

module.exports = sequelize;




