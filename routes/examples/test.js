// Require packages and set the port
const express = require('express');
const app = express();
const pool = require('../pool');
/*
import clientes from '../models/clientes';
app.use((req, res, next) => {
    req = {
        clientes
    };
    next();
});*/

app.get('/test', function (req, res, next) {
    let data = {};
    let test;
    //var consulta = "SELECT * nombre, email FROM clientes";
    let consulta = "SELECT * FROM clientes";
    pool.query(consulta, function (err, result, fields) {
        if (err) {
            //console.log("Consulta: " + consulta + " | Error:" + err);
            data["datos"] = 'Error';
            res.send(data);
            return next(err);
        }
        res.send(result);
        //console.log("resultado " + res + "o sino " + result);
    })
});

/*
//To test with models - not implemented yet
app.get('/test2', function (req, res, next) {

    let data = {};
    //var consulta = "SELECT * nombre, email FROM clientes";
    let consulta = "SELECT * FROM clientes";
    pool.query(consulta, function (err, result, fields) {
        if (err) {
            //console.log("Consulta: " + consulta + " | Error:" + err);
            data["datos"] = 'Error';
            res.send(data);
            return next(err);
        }
        res.send(result);
        return res.send(Object.values(req.models.clientes));
        //console.log("resultado " + res + "o sino " + result);
    })
});

*/

app.get('/test2/:id', function (req, res, next) {
    let data = {};
    //var consulta = "SELECT * nombre, email FROM clientes";
    let consulta = "SELECT * FROM clientes";
    pool.query(consulta, function (err, result, fields) {
        if (err) {
            //console.log("Consulta: " + consulta + " | Error:" + err);
            data["datos"] = 'Error';
            res.send(data);
            return next(err);
        }
        res.send(result);
        //return res.send(Object.values(req.models.clientes));
        return res.send(req.models.clientes[req.params.id]);
        //console.log("resultado " + res + "o sino " + result);
    })
});

/**
 * Others rest operations with http methods
 */
app.post('/post', (req, res) => {
    return res.send('Received a POST HTTP method');
});

app.put('/put', (req, res) => {
    return res.send('Received a PUT HTTP method');
});
app.delete('/delete', (req, res) => {
    return res.send('Received a DELETE HTTP method');
});

// Export the app
module.exports = app;