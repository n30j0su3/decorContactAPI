// Load the MySQL pool connection
const pool = require('../../controller/db');

// Execute query to check - Maybe exports info native not JSON
exports.executeQuery=function(query,callback){
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          throw err;
        }   
        connection.query(query,function(err,rows){
            connection.release();
            if(!err) {
                callback(null, {rows: rows});
            }           
        });
        connection.on('error', function(err) {      
              throw err;
              return;     
        });
    });
}