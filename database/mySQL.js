const mysql = require('mysql');

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password: "",
    database: "db_sm",
    dateStrings: true
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Database connected successfully !')
});


module.exports = db;