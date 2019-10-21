/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const util = __webpack_require__(6)
const mysql = __webpack_require__(7)
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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("nodemailer");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// Require packages and set the port
const express = __webpack_require__(0);
const app = express();
//Require the db-connection
//const db = require('../controller/db');
const pool = __webpack_require__(1);
//app.use(require('./test'));
//app.use(require('./users'));
app.use(__webpack_require__(8));
app.use(__webpack_require__(9));
app.use(__webpack_require__(10));
app.use(__webpack_require__(11));
app.use(__webpack_require__(12));
app.use(__webpack_require__(13));
// app.use(require('./upload'));
//Handled for error 404
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});
// Export the app
module.exports = app;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// Require packages and set the port
const express = __webpack_require__(0);
const port = 3002;
//Require the db-connection
//const db = require('./db/db');
//const bodyParser = require('body-parser');
const routes = __webpack_require__(4)
const bodyParser = __webpack_require__(14);
const cors = __webpack_require__(15);
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
app.use(__webpack_require__(4));

//Start the API to listen in the port selected
app.listen(port, function () {
    console.log(`La super badass API está escuchando por el puerto ${port}`);
  });

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("mysql");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// Require packages and set the port
const express = __webpack_require__(0);
const app = express();
const pool = __webpack_require__(1);

 /**
 *  
// create application/json parser
var jsonParser = bodyParser.json()
 // create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 // POST /login gets urlencoded bodies
  app.post('/login', urlencodedParser, function (req, res) {
    res.send('welcome, ' + req.body.username)
  })
   
  // POST /api/users gets JSON bodies
  app.post('/api/users', jsonParser, function (req, res) {
    // create user in req.body
  })
 */

//Get all user form db
app.get('/clientes', (req, res, next) => {
    let data = {};
    let consulta = "SELECT * FROM clientes";
    pool.query(consulta, function (err, result) {
        if (err) {
            //console.log("Consulta: " + consulta + " | Error:" + err);
            data["datos"] = 'Error';
            res.send(data);
            return next(err);
        }
        //res.send(result);
        //console.log("resultado " + res + "o sino " + result);
        return res.json(result);
        //return res.send(Object.values(result));
        //return res.send.json(Object.values(result));
    })
});

// Get user by cc
app.get('/clientes/:documento_cc', (req, res, next) => {
    let data = {};
    const ids = req.params.documento_cc;
    let consulta = "SELECT * FROM clientes WHERE documento_cc= ?";
    pool.query(consulta, ids, function (err, result) {
        if (err) {
            console.log("Consulta: " + consulta + " | Error:" + err);
            data["datos"] = 'Error';
            res.send(data);
            return next(err);
        }
        //return res.send(result);
        return res.json(result);
        //response.send(result);
    })
});

// Add a new user
/*
app.post('/clientes/', (req, res, next) => {
    //console.log("IMPRIMIENDO REQ\n");
    //console.log(req);
    //console.log("IMPRIMIENDO REQ.body\n");
    //console.log(req.body);
    let body = req.body;
    pool.query(`INSERT INTO clientes (ID, documento_cc, nombre, email, direccion_entrega, ciudad_entrega, celular) VALUES '${body.name}');`, (error, result) => {
        if (error) {
            let data = {};
            data["datos"] = 'Error';
            res.send(data);
            //console.log("EL DEBUG DEL ERROR ES EL SIGUIENTE\n");
            //console.log(error);
            return next(error);
        }
        res.status(201).send(`User added with ID: ${result.insertId}`);
    });
});
*/

// Add a new user
app.post('/clientes/', (req, res, next) => {
    pool.query('INSERT INTO clientes SET ?', req.body, (error, result) => {
        if (error) {
            let data = {};
            data["datos"] = 'Error';
            res.send(data);
            return next(error);
        }
        res.status(201).send(`User added with ID: ${result.insertId}`);
    });
});

// Update an existing user
app.put('/clientes/:documento_cc', (request, response) => {
    const id = request.params.documento_cc;
    pool.query('UPDATE clientes SET ? WHERE documento_cc = ?', [request.body, id], (error, result) => {
        if (error) {
            let data = {};
            data["datos"] = 'Error';
            res.send(data);
            return next(error);
        }
        response.send('User updated successfully.');
    });
});

// Delete a user
app.delete('/clientes/:documento_cc', (request, response) => {
    const id = request.params.documento_cc;
    pool.query('DELETE FROM clientes WHERE documento_cc = ?', id, (error, result) => {
        if (error) {
            let data = {};
            data["datos"] = 'Error';
            res.send(data);
            return next(error);
        }
        response.send('User deleted.');
    });
});

// Export the app
module.exports = app;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// Require packages and set the port
const express = __webpack_require__(0);
const app = express();
const pool = __webpack_require__(1);
let id_new = 0;
//Requiere nodemailer for emails
const nodeMailer = __webpack_require__(2);
const multer = __webpack_require__(3);
const storage	=	multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads/');
    },
    filename: function (req, file, callback) {
      // To add the extension files
      let eex = file.mimetype.replace(/[/]|image|document|application|video/gi, "");
      eex = eex.replace("msword", "doc");
      //console.log(file.mimetype.replace("image/", "."));
      callback(null, file.originalname + '-' + Date.now() + '.' + eex);
    },limits:{fileSize: 1000000},
  });
   const upload = multer({
       storage : storage,
    }).array('file',5);

// Get all novedades by cc_clientes
app.get('/novedades/:documento_cc', (req, res, next) => {
    let data = {};
    const ids = req.params.documento_cc;
    //let consulta = "SELECT * FROM novedades WHERE documento_cc= ?";
    let consulta = "SELECT * FROM novedades WHERE cliente in (SELECT ID from clientes where documento_cc= ?) ";
    pool.query(consulta, ids, function (err, result) {
        if (err) {
            console.log("Consulta: " + consulta + " | Error:" + err);
            data["datos"] = 'Error';
            res.send(data);
            return next(err);
        }
        //return res.send(result);
        return res.json(result);
        //response.send(result);
    })
});

// Get novedades by # pedido
app.get('/novedades/:num_pedido', (req, res, next) => {
    let data = {};
    const ids = req.params.num_pedido;
    //let consulta = "SELECT * FROM novedades WHERE documento_cc= ?";
    let consulta = "SELECT * FROM novedades WHERE num_pedido= ?";
    pool.query(consulta, ids, function (err, result) {
        if (err) {
            console.log("Consulta: " + consulta + " | Error:" + err);
            data["datos"] = 'Error';
            res.send(data);
            return next(err);
        }
        //return res.send(result);
        return res.json(result);

        //response.send(result);
    })
});
// Get novedades by tipo_documento_compra
app.get('/novedades/:tipo_documento_compra', (req, res, next) => {
    let data = {};
    const ids = req.params.tipo_documento_compra;
    //let consulta = "SELECT * FROM novedades WHERE documento_cc= ?";
    let consulta = "SELECT * FROM novedades WHERE tipo_documento_compra= ?";
    pool.query(consulta, ids, function (err, result) {
        if (err) {
            console.log("Consulta: " + consulta + " | Error:" + err);
            data["datos"] = 'Error';
            res.send(data);
            return next(err);
        }
        //return res.send(result);
        return res.json(result);
        //response.send(result);
    })
});

//Post to upload files
app.post('/novedadup/', (req, res, next) => {
    let path = '';
    upload(req, res, function (err) {
       if (err) {
         // An error occurred when uploading
         console.log(err);
         return res.status(422).send("an Error occured uploading files")
       }
       if (!req.files) {
        return res.status(422).send("Tipo de archivo no compatible");
       }
      // No error occured.
       //path = req.file.path;
       path = req.files.path;
       return res.status(202).send("Upload Completed for " + path);
    }); 
});

// Add a new novedad
app.post('/novedades/', (req, res, next) => {
    pool.query('INSERT INTO novedades SET ?', req.body, (error, result) => {
        if (error) {
            let data = {};
            data["datos"] = 'Error';
            res.send(data);
            return next(error);
        }
        const newid = doSomethingWithResult(result.insertId);
        sendEmailAdmin(newid);
        sendEmailUser(newid);
        res.status(201).send(`Novedad added with ID: ${result.insertId}`);
    });
    function doSomethingWithResult(result) {
        id_new = result;
        return id_new;
    }

    async function sendEmailAdmin(result) {
        //Send email admin
        let transporter = nodeMailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'jjrojas@grupodecor.com', // generated ethereal user
                pass: 'Jeissonjosue-1' // generated ethereal password
            },
            requireTLS: true,
            tls: {
                ciphers: 'SSLv3'
            }
        });
        let email_arr = ['jorojas1@gmail.com', 'jjrojas@grupodecor.com', 'jorojas1@hotmail.com'];
        let mailOptions = {
            // should be replaced with real recipient's account
            to: email_arr,
            subject: 'Contacto DecorApp',
            //body: req.body,
            //text: 'Hello world?', // plain text body
            //html: '<b>Nuevo contacto a traves de la App de contacto</b>'+ req.body.cliente // html body
            html: '<b>Nueva solicitud de novedad de producto a traves de la App de contacto</b><br><br>' +
                '<b># Consecutivo: </b>' + result + '<br>' +
                '<b>Canal de venta: </b>' + req.body.empresa + '<br>' +
                '<b>Fecha de creacion solicitud: </b>' + req.body.fecha_creacion + '<br>' +
                '<b>Fecha de modificacion solicitud: </b>' + req.body.fecha_modificacion + '<br>' +
                '<b>Estado de solicitud: </b>' + req.body.estado_solicitud + '<br><br>' +
                '<b>Cédula cliente: </b>' + req.body.cliente + '<br>' +
                '<b>Tipo documento de compra: </b>' + req.body.tipo_documento_compra + '<br>' +
                '<b># pedido: </b>' + req.body.num_pedido + '<br>' +
                '<b>Codigo de producto: </b>' + req.body.codigo_producto + '<br>' +
                '<b>Tipo de novedad: </b>' + req.body.tipo_novedad + '<br>' +
                '<b>Descripcion producto: </b>' + req.body.descripcion_producto + '<br>' +
                '<b>Cantidad comprada: </b>' + req.body.cantidad_comprada + '<br>' +
                '<b>Cantidad con novedad: </b>' + req.body.cantidad_novedad + '<br>' +
                '<b>Autorización tratamiento de datos: </b>' + req.body.autorizacion + '<br>'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
    }
    async function sendEmailUser(result) {
        // Send email user
        let transporter2 = nodeMailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'jjrojas@grupodecor.com', // generated ethereal user
                pass: 'Jeissonjosue-1' // generated ethereal password
            },
            requireTLS: true,
            tls: {
                ciphers: 'SSLv3'
            }
        });
        let email_arr2 = ['jorojas1@gmail.com'];
        let mailOptions2 = {
            // should be replaced with real recipient's account
            to: email_arr2,
            subject: 'Tu novedad de producto fué creada con éxito',
            //body: req.body,
            //text: 'Hello world?', // plain text body
            //html: '<b>Nuevo contacto a traves de la App de contacto</b>'+ req.body.cliente // html body
            html: '<b>¡Tu novedad de producto fué creada con éxito!</b><br><br>' +
                '<b># Consecutivo creado: </b>' + result + '<br>' +
                '<p>Tu reporte ha sido creado con éxito en nuestro sistema y será atendido en el menor tiempo posible por nuestro personal capacitado.</p>'
            /*subject: req.body.subject,
            body: req.body.message*/
        };

        transporter2.sendMail(mailOptions2, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
    }
});

// Update an existing novedad by # novedad
app.put('/novedades/:id', (request, response) => {
    const id = request.params.id;
    pool.query('UPDATE novedades SET ? WHERE id = ?', [request.body, id], (error, result) => {
        if (error) {
            let data = {};
            data["datos"] = 'Error';
            res.send(data);
            return next(error);
        }
        response.send('novedad updated successfully.');
    });
});

// Delete a novedad
app.delete('/novedades/:id', (request, response) => {
    const id = request.params.id;
    pool.query('DELETE FROM novedades WHERE id = ?', id, (error, result) => {
        if (error) {
            let data = {};
            data["datos"] = 'Error';
            res.send(data);
            return next(error);
        }
        response.send('Novedad deleted.');
    });
});

// Export the app
module.exports = app;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// Require packages and set the port
const express = __webpack_require__(0);
const app = express();
const pool = __webpack_require__(1);

// Get all pedidos by cc_clientes
app.get('/pedidos/:documento_cc', (req, res, next) => {
    let data = {};
    const ids = req.params.documento_cc;
    //let consulta = "SELECT * FROM novedades WHERE documento_cc= ?";
    let consulta = "SELECT * FROM pedidos WHERE cliente in (SELECT ID from clientes where documento_cc= ?) ";
    pool.query(consulta, ids, function (err, result) {
        if (err) {
            console.log("Consulta: " + consulta + " | Error:" + err);
            data["datos"] = 'Error';
            res.send(data);
            return next(err);
        }
        //return res.send(result);
        return res.json(result);
        //response.send(result);
    })
});

// Get pedidos by id_pedido
app.get('/pedidos/:id', (req, res, next) => {
    let data = {};
    const ids = req.params.id;
    //let consulta = "SELECT * FROM pedidos WHERE documento_cc= ?";
    let consulta = "SELECT * FROM pedidos WHERE id= ?";
    pool.query(consulta, ids, function (err, result) {
        if (err) {
            console.log("Consulta: " + consulta + " | Error:" + err);
            data["datos"] = 'Error';
            res.send(data);
            return next(err);
        }
        //return res.send(result);
        return res.json(result);
        //response.send(result);
    })
});

// Add a new pedido
app.post('/pedidos/', (req, res, next) => {
    pool.query('INSERT INTO pedidos SET ?', req.body, (error, result) => {
        if (error) {
            let data = {};
            data["datos"] = 'Error';
            res.send(data);
            return next(error);
        }
        res.status(201).send(`Pedido added with ID: ${result.insertId}`);
    });
});

// Update an existing novedad by # novedad
app.put('/pedido/:id', (request, response) => {
    const id = request.params.id;
    pool.query('UPDATE pedidos SET ? WHERE id = ?', [request.body, id], (error, result) => {
        if (error) {
            let data = {};
            data["datos"] = 'Error';
            res.send(data);
            return next(error);
        }
        response.send('pedido updated successfully.');
    });
});

// Delete a pedido
app.delete('/pedidos/:id', (request, response) => {
    const id = request.params.id;
    pool.query('DELETE FROM pedidos WHERE id = ?', id, (error, result) => {
        if (error) {
            let data = {};
            data["datos"] = 'Error';
            res.send(data);
            return next(error);
        }
        response.send('pedido deleted.');
    });
});

// Export the app
module.exports = app;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// Require packages and set the port
const express = __webpack_require__(0);
const app = express();
const pool = __webpack_require__(1);
let id_new = 0;
//Requiere nodemailer for emails
const nodeMailer = __webpack_require__(2);
// Get all pqrs by cc_clientes
app.get('/pqrs/:documento_cc', (req, res, next) => {
    let data = {};
    const ids = req.params.documento_cc;
    //let consulta = "SELECT * FROM novedades WHERE documento_cc= ?";
    let consulta = "SELECT * FROM pqrs WHERE cliente in (SELECT ID from clientes where documento_cc= ?) ";
    pool.query(consulta, ids, function (err, result) {
        if (err) {
            console.log("Consulta: " + consulta + " | Error:" + err);
            data["datos"] = 'Error';
            res.send(data);
            return next(err);
        }
        //return res.send(result);
        return res.json(result);
        //response.send(result);
    })
});

// Get pqrs by id
app.get('/pqrs/:id', (req, res, next) => {
    let data = {};
    const ids = req.params.id;
    let consulta = "SELECT * FROM pqrs WHERE id= ?";
    pool.query(consulta, ids, function (err, result) {
        if (err) {
            console.log("Consulta: " + consulta + " | Error:" + err);
            data["datos"] = 'Error';
            res.send(data);
            return next(err);
        }
        //return res.send(result);
        return res.json(result);
        //response.send(result);
    })
});
// Get pqrs by tipo_documento_compra
app.get('/pqrs/:tipo_documento_compra', (req, res, next) => {
    let data = {};
    const ids = req.params.tipo_documento_compra;
    let consulta = "SELECT * FROM pqrs WHERE tipo_documento_compra= ?";
    pool.query(consulta, ids, function (err, result) {
        if (err) {
            console.log("Consulta: " + consulta + " | Error:" + err);
            data["datos"] = 'Error';
            res.send(data);
            return next(err);
        }
        //return res.send(result);
        return res.json(result);
        //response.send(result);
    })
});

// Add a new pqrs
app.post('/pqrs/', (req, res, next) => {
    pool.query('INSERT INTO pqrs SET ?', req.body, (error, result) => {
        if (error) {
            let data = {};
            data["datos"] = 'Error';
            res.send(data);
            return next(error);
        }
        const newid = doSomethingWithResult(result.insertId);
        sendEmailAdmin(newid);
        sendEmailUser(newid);
        res.status(201).send(`PQRS added with ID: ${result.insertId}`);
    });
    function doSomethingWithResult(result) {
        id_new = result;
        return id_new;
    }
    async function sendEmailAdmin(result) {
        //Send email admin
        let transporter = nodeMailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'jjrojas@grupodecor.com', // generated ethereal user
                pass: 'Jeissonjosue-1' // generated ethereal password
            },
            requireTLS: true,
            tls: {
                ciphers: 'SSLv3'
            }
        });
        let email_arr = ['jorojas1@gmail.com', 'jjrojas@grupodecor.com', 'jorojas1@hotmail.com'];
        let mailOptions = {
            // should be replaced with real recipient's account
            to: email_arr,
            subject: 'Contacto DecorApp',
            html: '<b>Nueva PQRS a traves de la App de contacto</b><br><br>' +
                '<b># Consecutivo: </b>' + result + '<br>' +
                '<b>Canal de venta: </b>' + req.body.empresa + '<br>' +
                '<b>Fecha de creacion solicitud: </b>' + req.body.fecha_creacion + '<br>' +
                '<b>Fecha de modificacion solicitud: </b>' + req.body.fecha_modificacion + '<br>' +
                '<b>Estado de solicitud: </b>' + req.body.estado_solicitud + '<br><br>' +
                '<b>Cédula cliente: </b>' + req.body.cliente + '<br>' +
                '<b>Tipo documento de compra: </b>' + req.body.tipo_documento_compra + '<br>' +
                '<b># pedido: </b>' + req.body.num_pedido + '<br>' +
                '<b>Motivo de contacto: </b>' + req.body.motivo_contacto + '<br>' +
                '<b>Observaciones: </b>' + req.body.observaciones + '<br>' +
                '<b>Autorización tratamiento de datos: </b>' + req.body.autorizacion + '<br>'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
    }
    async function sendEmailUser(result) {
        // Send email user
        let transporter2 = nodeMailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'jjrojas@grupodecor.com', // generated ethereal user
                pass: 'Jeissonjosue-1' // generated ethereal password
            },
            requireTLS: true,
            tls: {
                ciphers: 'SSLv3'
            }
        });
        let email_arr2 = ['jorojas1@gmail.com'];
        let mailOptions2 = {
            // should be replaced with real recipient's account
            to: email_arr2,
            subject: 'Tu PQRS fué creada con éxito',
            //body: req.body,
            //text: 'Hello world?', // plain text body
            //html: '<b>Nuevo contacto a traves de la App de contacto</b>'+ req.body.cliente // html body
            html: '<b>¡Tu PQRS fué creada con éxito!</b><br><br>' +
                '<b># Consecutivo creado: </b>' + result + '<br>' +
                '<p>Tu reporte ha sido creado con éxito en nuestro sistema y será atendido en el menor tiempo posible por nuestro personal capacitado.</p>'
            /*subject: req.body.subject,
            body: req.body.message*/
        };

        transporter2.sendMail(mailOptions2, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
    }
});

// Update an existing pqrs by #pqrs
app.put('/pqrs/:id', (request, response) => {
    const id = request.params.id;
    pool.query('UPDATE pqrs SET ? WHERE id = ?', [request.body, id], (error, result) => {
        if (error) {
            let data = {};
            data["datos"] = 'Error';
            res.send(data);
            return next(error);
        }
        response.send('pqrs updated successfully.');
    });
});

// Delete a pqrs
app.delete('/pqrs/:id', (request, response) => {
    const id = request.params.id;
    pool.query('DELETE FROM pqrs WHERE id = ?', id, (error, result) => {
        if (error) {
            let data = {};
            data["datos"] = 'Error';
            res.send(data);
            return next(error);
        }
        response.send('pqrs deleted.');
    });
});

// Export the app
module.exports = app;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// Require packages and set the port
const express = __webpack_require__(0);
const app = express();
const pool = __webpack_require__(1);
//const fs = require('fs')
let id_new = 0;
//Requiere nodemailer for emails
const nodeMailer = __webpack_require__(2);
//require multer for the file uploads
const multer = __webpack_require__(3);
// set the directory for the uploads to the uploaded to
const DIR = './uploads/';
//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
//const upload = multer({dest: DIR}).array('file',5);
//.single('file');
//to send emails https://www.inelaah.com/node-send-email
const accepted_extensions = ['jpg', 'png', 'gif'];
const storage	=	multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads/');
    },
    filename: function (req, file, callback) {
      // To add the extension files
      let eex = file.mimetype.replace(/[/]|image|document|application|video/gi, "");
      eex = eex.replace("msword", "doc");
      //console.log(file.mimetype.replace("image/", "."));
      callback(null, file.originalname + '-' + Date.now() + '.' + eex);
    },
    fileFilter: function(req, file, callback){
        checkFileType(file, callback);
    },limits:{fileSize: 1000000},
  });
   const upload = multer({
       storage : storage,/*
       fileFilter: (req, file, cb) => {
        if (accepted_extensions.some(ext => file.originalname.endsWith("." + ext))) {
            return cb(null, true);
        }
        // otherwise, return error
        return cb(new Error('Only ' + accepted_extensions.join(", ") + ' files are allowed!'));
    }*/
    }).array('file',5);

// Check File Type
function checkFileType(file, callback){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif|pdf|mp4|webm/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    console.log(extname);
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    console.log(mimetype);
    if(mimetype && extname){
      return callback(null,true);
    } else {
        callback('Error: Images Only!');
    }
  }
/*
const multer	=	require('multer');
const storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '../uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
 const upload = multer({ storage : storage}).array('upload', 5);*/



 // const upload = multer({ storage : storage}).single('upload');
// const upload = multer({ storage : storage}).array('upload', 5);

// const config= path.resolve(configFilePath);

//const multer  = require('multer')
//const upload = multer({ dest: '../uploads/' })

//app.use(multer({dest:'./public/uploads/'}));
// const upload = multer().single('upload')


// Set The Storage Engine
/*
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
      // cb(null, file.originalname);
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
*/

// const upload = multer({ storage: storage });

// Init Upload
/*
const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).single('upload');

// Check File Type
function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  }
*/
// multipart for file upload
// const multipart  =  require('connect-multiparty');
// const multipartMiddleware  =  multipart({ uploadDir:  '../uploads/' });

// formidable for file upload
// const formidable = require('formidable');

// const fileUpload = require('express-fileupload');
// app.use(fileUpload());

// use fileuploads https://stackoverflow.com/questions/45829408/uploading-file-with-express-fileupload
// Get all roturas by cc_clientes
app.get('/rotura/:documento_cc', (req, res, next) => {
    let data = {};
    const ids = req.params.documento_cc;
    let consulta = "SELECT * FROM rotura WHERE cliente in (SELECT ID from clientes where documento_cc= ?) ";
    pool.query(consulta, ids, function (err, result) {
        if (err) {
            console.log("Consulta: " + consulta + " | Error:" + err);
            data["datos"] = 'Error';
            res.send(data);
            return next(err);
        }
        //return res.send(result);
        return res.json(result);
        //response.send(result);
    })
});

// Get rotura by id
app.get('/rotura/:id', (req, res, next) => {
    let data = {};
    const ids = req.params.id;
    let consulta = "SELECT * FROM rotura WHERE id= ?";
    pool.query(consulta, ids, function (err, result) {
        if (err) {
            console.log("Consulta: " + consulta + " | Error:" + err);
            data["datos"] = 'Error';
            res.send(data);
            return next(err);
        }
        //return res.send(result);
        return res.json(result);
        //response.send(result);
    })
});
// Get rotura by tipo_documento_compra
app.get('/rotura/:tipo_documento_compra', (req, res, next) => {
    let data = {};
    const ids = req.params.tipo_documento_compra;
    let consulta = "SELECT * FROM rotura WHERE tipo_documento_compra= ?";
    pool.query(consulta, ids, function (err, result) {
        if (err) {
            console.log("Consulta: " + consulta + " | Error:" + err);
            data["datos"] = 'Error';
            res.send(data);
            return next(err);
        }
        //return res.send(result);
        return res.json(result);
        //response.send(result);
    })
});

// Add a new rotura
// upload.array('photos', 12),
// FINALLY https://scotch.io/tutorials/angular-file-uploads-with-an-express-backend#toc-setting-up-the-upload-route
app.post('/roturaup/', (req, res, next) => {
    let path = '';
    upload(req, res, function (err) {
       if (err) {
         // An error occurred when uploading
         console.log(err);
         return res.status(422).send("an Error occured uploading files")
       }
       if (!req.files) {
        return res.status(422).send("Tipo de archivo no compatible");
       }
      // No error occured.
       //path = req.file.path;
       path = req.files.path;
       return res.status(202).send("Upload Completed for " + path);
    }); 
});

app.post('/rotura/', (req, res, next) => {
  //console.log(req.body);
  //pool.query('INSERT INTO rotura SET ?', req.body.product, (error, result) => {
  pool.query('INSERT INTO rotura SET ?', req.body, (error, result) => {
    if (error) throw error;
    const newid = doSomethingWithResult(result.insertId);
    sendEmailAdmin(newid);
    sendEmailUser(newid);
    res.status(201).send(`rotura added with ID: ${result.insertId}`);
  });
  function doSomethingWithResult(result) {
    id_new = result;
    return id_new;
  }

  async function sendEmailAdmin(result) {
    //Send email admin
    let transporter = nodeMailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'jjrojas@grupodecor.com', // generated ethereal user
        pass: 'Jeissonjosue-1' // generated ethereal password
      },
      requireTLS: true,
      tls: {
        ciphers: 'SSLv3'
      }
    });
    let email_arr = ['jorojas1@gmail.com', 'jjrojas@grupodecor.com', 'jorojas1@hotmail.com'];
    let mailOptions = {
      // should be replaced with real recipient's account
      to: email_arr,
      subject: 'Contacto DecorApp',
      //body: req.body,
      //text: 'Hello world?', // plain text body
      //html: '<b>Nuevo contacto a traves de la App de contacto</b>'+ req.body.cliente // html body
      html: '<b>Nueva novedad de rotura a traves de la App de contacto</b><br><br>' +
        '<b># Consecutivo: </b>' + result + '<br>' +
        '<b>Canal de venta: </b>' + req.body.empresa + '<br>' +
        '<b>Fecha de creacion solicitud: </b>' + req.body.fecha_creacion + '<br>' +
        '<b>Fecha de modificacion solicitud: </b>' + req.body.fecha_modificacion + '<br>' +
        '<b>Estado de solicitud: </b>' + req.body.estado_solicitud + '<br><br>' +
        '<b>Cédula cliente: </b>' + req.body.cliente + '<br>' +
        '<b>Tipo documento de compra: </b>' + req.body.tipo_documento_compra + '<br>' +
        '<b># pedido: </b>' + req.body.num_pedido + '<br>' +
        '<b>Codigo de producto: </b>' + req.body.codigo_producto + '<br>' +
        '<b>Descripcion producto: </b>' + req.body.descripcion_producto + '<br>' +
        '<b>Cantidad comprada: </b>' + req.body.cantidad_comprada + '<br>' +
        '<b>Cantidad de rotura: </b>' + req.body.cantidad_rotura + '<br>' +
        '<b>Observaciones: </b>' + req.body.observaciones + '<br>' +
        '<b>Forma de compensacion: </b>' + req.body.forma_compensacion + '<br>' +
        '<b>Direccion de compensacion: </b>' + req.body.direccion_compensacion + '<br>' +
        '<b>Ciudad: </b>' + req.body.ciudad + '<br>' +
        '<b>Autorización tratamiento de datos: </b>' + req.body.autorizacion + '<br>'
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });
  }
  async function sendEmailUser(result) {
    // Send email user
    let transporter2 = nodeMailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'jjrojas@grupodecor.com', // generated ethereal user
        pass: 'Jeissonjosue-1' // generated ethereal password
      },
      requireTLS: true,
      tls: {
        ciphers: 'SSLv3'
      }
    });
    let email_arr2 = ['jorojas1@gmail.com'];
    let mailOptions2 = {
      // should be replaced with real recipient's account
      to: email_arr2,
      subject: 'Tu novedad de rotura fué creada con éxito',
      //body: req.body,
      //text: 'Hello world?', // plain text body
      //html: '<b>Nuevo contacto a traves de la App de contacto</b>'+ req.body.cliente // html body
      html: '<b>¡Tu novedad de rotura fué creada con éxito!</b><br><br>' +
        '<b># Consecutivo creado: </b>' + result + '<br>' +
        '<p>Tu reporte ha sido creado con éxito en nuestro sistema y será atendido en el menor tiempo posible por nuestro personal capacitado.</p>'
      /*subject: req.body.subject,
      body: req.body.message*/
    };

    transporter2.sendMail(mailOptions2, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });
  }

});

// Update an existing rotura by #rotura
app.put('/rotura/:id', (request, response) => {
    const id = request.params.id;
    pool.query('UPDATE rotura SET ? WHERE id = ?', [request.body, id], (error, result) => {
        if (error) {
            let data = {};
            data["datos"] = 'Error';
            res.send(data);
            return next(error);
        }
        response.send('rotura updated successfully.');
    });
});

// Delete a rotura
app.delete('/rotura/:id', (request, response) => {
    const id = request.params.id;
    pool.query('DELETE FROM rotura WHERE id = ?', id, (error, result) => {
        if (error) {
            let data = {};
            data["datos"] = 'Error';
            res.send(data);
            return next(error);
        }
        response.send('rotura deleted.');
    });
});

// Export the app
module.exports = app;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// Require packages and set the port
const express = __webpack_require__(0);
const app = express();
const pool = __webpack_require__(1);
let id_new = 0;
//Requiere nodemailer for emails
const nodeMailer = __webpack_require__(2);
const multer = __webpack_require__(3);
const storage	=	multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads/');
    },
    filename: function (req, file, callback) {
      // To add the extension files
      let eex = file.mimetype.replace(/[/]|image|document|application|video/gi, "");
      eex = eex.replace("msword", "doc");
      //console.log(file.mimetype.replace("image/", "."));
      callback(null, file.originalname + '-' + Date.now() + '.' + eex);
    },limits:{fileSize: 1000000},
  });
   const upload = multer({
       storage : storage,
    }).array('file',5);

// Get all soporte by cc_clientes
app.get('/soporte/:documento_cc', (req, res, next) => {
    let data = {};
    const ids = req.params.documento_cc;
    let consulta = "SELECT * FROM soporte WHERE cliente in (SELECT ID from clientes where documento_cc= ?) ";
    pool.query(consulta, ids, function (err, result) {
        if (err) {
            console.log("Consulta: " + consulta + " | Error:" + err);
            data["datos"] = 'Error';
            res.send(data);
            return next(err);
        }
        //return res.send(result);
        return res.json(result);
        //response.send(result);
    })
});

// Get soporte by id
app.get('/soporte/:id', (req, res, next) => {
    let data = {};
    const ids = req.params.id;
    let consulta = "SELECT * FROM soporte WHERE id= ?";
    pool.query(consulta, ids, function (err, result) {
        if (err) {
            console.log("Consulta: " + consulta + " | Error:" + err);
            data["datos"] = 'Error';
            res.send(data);
            return next(err);
        }
        //return res.send(result);
        return res.json(result);
        //response.send(result);
    })
});
// Get soporte by tipo_documento_compra
app.get('/soporte/:tipo_documento_compra', (req, res, next) => {
    let data = {};
    const ids = req.params.tipo_documento_compra;
    let consulta = "SELECT * FROM soporte WHERE tipo_documento_compra= ?";
    pool.query(consulta, ids, function (err, result) {
        if (err) {
            console.log("Consulta: " + consulta + " | Error:" + err);
            data["datos"] = 'Error';
            res.send(data);
            return next(err);
        }
        //return res.send(result);
        return res.json(result);
        //response.send(result);
    })
});

//Post to upload files
app.post('/soporteup/', (req, res, next) => {
    let path = '';
    upload(req, res, function (err) {
       if (err) {
         // An error occurred when uploading
         console.log(err);
         return res.status(422).send("an Error occured uploading files")
       }
       if (!req.files) {
        return res.status(422).send("Tipo de archivo no compatible");
       }
      // No error occured.
       //path = req.file.path;
       path = req.files.path;
       return res.status(202).send("Upload Completed for " + path);
    }); 
});

// Add a new soporte
app.post('/soporte/', (req, res, next) => {
    pool.query('INSERT INTO soporte SET ?', req.body, (error, result) => {
        if (error) {
            let data = {};
            data["datos"] = 'Error';
            res.send(data);
            return next(error);
        }
        const newid = doSomethingWithResult(result.insertId);
        sendEmailAdmin(newid);
        sendEmailUser(newid);
        res.status(201).send(`soporte added with ID: ${result.insertId}`);
    });
    function doSomethingWithResult(result) {
        id_new = result;
        return id_new;
    }
    async function sendEmailAdmin(result) {
        //Send email admin
        let transporter = nodeMailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'jjrojas@grupodecor.com', // generated ethereal user
                pass: 'Jeissonjosue-1' // generated ethereal password
            },
            requireTLS: true,
            tls: {
                ciphers: 'SSLv3'
            }
        });
        let email_arr = ['jorojas1@gmail.com', 'jjrojas@grupodecor.com', 'jorojas1@hotmail.com'];
        let mailOptions = {
            // should be replaced with real recipient's account
            to: email_arr,
            subject: 'Contacto DecorApp',
            html: '<b>Nueva solicitud de soporte de producto a traves de la App de contacto</b><br><br>' +
                '<b># Consecutivo: </b>' + result + '<br>' +
                '<b>Canal de venta: </b>' + req.body.empresa + '<br>' +
                '<b>Fecha de creacion solicitud: </b>' + req.body.fecha_creacion + '<br>' +
                '<b>Fecha de modificacion solicitud: </b>' + req.body.fecha_modificacion + '<br>' +
                '<b>Estado de solicitud: </b>' + req.body.estado_solicitud + '<br><br>' +
                '<b>Cédula cliente: </b>' + req.body.cliente + '<br>' +
                '<b>Tipo documento de compra: </b>' + req.body.tipo_documento_compra + '<br>' +
                '<b># pedido: </b>' + req.body.num_pedido + '<br>' +
                '<b>Codigo de producto: </b>' + req.body.codigo_producto + '<br>' +
                '<b>Descripcion producto: </b>' + req.body.descripcion_producto + '<br>' +
                '<b>Observaciones: </b>' + req.body.observaciones + '<br>' +
                '<b>Autorización tratamiento de datos: </b>' + req.body.autorizacion + '<br>'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
    }
    async function sendEmailUser(result) {
        // Send email user
        let transporter2 = nodeMailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'jjrojas@grupodecor.com', // generated ethereal user
                pass: 'Jeissonjosue-1' // generated ethereal password
            },
            requireTLS: true,
            tls: {
                ciphers: 'SSLv3'
            }
        });
        let email_arr2 = ['jorojas1@gmail.com'];
        let mailOptions2 = {
            // should be replaced with real recipient's account
            to: email_arr2,
            subject: 'Tu solicitud de soporte de producto fué creada con éxito',
            //body: req.body,
            //text: 'Hello world?', // plain text body
            //html: '<b>Nuevo contacto a traves de la App de contacto</b>'+ req.body.cliente // html body
            html: '<b>¡Tu solicitud de soporte de producto fué creada con éxito!</b><br><br>' +
                '<b># Consecutivo creado: </b>' + result + '<br>' +
                '<p>Tu reporte ha sido creado con éxito en nuestro sistema y será atendido en el menor tiempo posible por nuestro personal capacitado.</p>'
            /*subject: req.body.subject,
            body: req.body.message*/
        };

        transporter2.sendMail(mailOptions2, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
    }
});

// Update an existing soporte by #soporte
app.put('/soporte/:id', (request, response) => {
    const id = request.params.id;
    pool.query('UPDATE soporte SET ? WHERE id = ?', [request.body, id], (error, result) => {
        if (error) {
            let data = {};
            data["datos"] = 'Error';
            res.send(data);
            return next(error);
        }
        response.send('soporte updated successfully.');
    });
});

// Delete a soporte
app.delete('/soporte/:id', (request, response) => {
    const id = request.params.id;
    pool.query('DELETE FROM soporte WHERE id = ?', id, (error, result) => {
        if (error) {
            let data = {};
            data["datos"] = 'Error';
            res.send(data);
            return next(error);
        }
        response.send('soporte deleted.');
    });
});

// Export the app
module.exports = app;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ })
/******/ ]);