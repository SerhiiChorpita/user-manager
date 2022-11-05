const mysql = require('mysql2');

const config = {
    host: 'localhost',
    user: 'root',
    password: '4m3Gs8KL5t+12',
    database: 'api',
};

const pool = mysql.createPool(config);

module.exports = pool;