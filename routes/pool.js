const util = require('util')
const mysql = require('mysql')
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'test-sql',
  password: 'test-sql',
  database: 'test'
})

/**
 * MariaDB Pool connection
 */

/*
const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: 'mydb.com', 
     user:'myUser', 
     password: 'myPassword',
     database: 'test',
     connectionLimit: 10
});
*/

// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.')
    }else{
      connection.on('error', function(err) {
        console.log(err.code); // 'ER_BAD_DB_ERROR'
      });
    }
  }

  if (connection) connection.release()

  return
})
pool.on('error', function(err) {
  console.log("[mysql error]",err);
});

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query)

module.exports = pool;
