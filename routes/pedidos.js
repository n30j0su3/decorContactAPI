// Require packages and set the port
const express = require('express');
const app = express();
const pool = require('../routes/pool');

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