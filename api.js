// Require packages and set the port
const express = require('express');
const port = 3002;
//Require the db-connection
//const db = require('./db/db');
//const bodyParser = require('body-parser');
const routes = require('./routes/index')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

/*const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({
    uploadDir: './uploads'
});*/

// Use Node.js body parsing middleware
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true
}));
//Deprecated constructor
//app.use(bodyParser);
//New constructor
//app.use(bodyParser.urlencoded({
//  extended: true
//}));
//app.use(bodyParser.json());

//Use CORS Middleware
//app.use(cors());
let allowedOrigins = ['http://localhost:4200',
                      'http://decorceramica.com'];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));


//Define the API's routes
app.use(require('./routes/index'));

//Start the API to listen in the port selected
app.listen(port, function () {
    console.log(`La super badass API está escuchando por el puerto ${port}`);
  });