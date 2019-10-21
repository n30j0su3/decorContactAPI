const mysql = require('mysql');

// Set database connection credentials
const config = {
    host: 'localhost',
    user: 'test-sql',
    password: 'test-sql',
    database: 'test'
};

// Create a MySQL pool
const pool = mysql.createPool(config);

// Export the pool
module.exports = pool;