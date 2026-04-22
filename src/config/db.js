const mysql = require('mysql2');

const db = mysql.createConnection(process.env.MYSQL_PUBLIC_URL);

db.connect((err) => {
    if (err) {
        console.error('Error de conexión:', err);
        return;
    }
    console.log('Conectado a MySQL');
});

module.exports = db;