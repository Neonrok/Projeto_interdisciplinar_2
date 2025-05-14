const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'172.22.0.201:3306',
    user:'g19',
    password:'UpKJL8D_Fa',
    database:'172.22.0.201'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
});

module.exports = connection;