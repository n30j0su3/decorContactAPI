// Require packages and set the port
const express = require('express');
const app = express();
//Require the db-connection
//const db = require('../controller/db');
const pool = require('../routes/pool');
//app.use(require('./test'));
//app.use(require('./users'));
app.use(require('./clientes'));
app.use(require('./novedades'));
app.use(require('./pedidos'));
app.use(require('./pqrs'));
app.use(require('./rotura'));
app.use(require('./soporte'));
// app.use(require('./upload'));
//Handled for error 404
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});
// Export the app
module.exports = app;
