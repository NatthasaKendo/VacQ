const mysql = require("mysql"); 

var connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "040500",
    database: "vacCenter"
});

module.exports = connection;