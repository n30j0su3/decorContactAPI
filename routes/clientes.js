// Require packages and set the port
const express = require('express');
const app = express();
const pool = require('../routes/pool');

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