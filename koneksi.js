var mysql = require('mysql');

// Buat koneksi database
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbrestapi'
});

conn.connect((err) => {
    if (err) throw err;
    console.log('MySql Terkoneksi');
});

module.exports = conn;