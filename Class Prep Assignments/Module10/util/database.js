const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "fadel-5750-sp23.ckm1cfmd3i4j.us-west-2.rds.amazonaws.com",
    user: "5750stevesears",
    database: "5750stevesears",
    password: "A01234875"
 });     

 module.exports = pool.promise();