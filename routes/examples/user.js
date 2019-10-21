//By pabhoz
//https://github.com/pabhoz/nodeJSREST/blob/master/routes/user.js
const connection = require("../mysql.conf").connection;

const express = require('express');
const app = express();

//Traer todos los usuarios
app.get('/user', (req, res) => {
    connection.connect();
    connection.query('SELECT * FROM users', (error, results, fields) => {
        if (error) { throw error }
        connection.end();
        res.json(results);
    });
});

//Traer al usuario cuya id sea :id
app.get('/user/:id', (req, res) => {
    connection.connect();
    connection.query(`SELECT * FROM users WHERE id = ${req.params.id}`, (error, results, fields) => {
        if (error) { throw error }
        connection.end();
        res.json(results);
    });
});

app.post('/user', (req, res) => {
    let body = req.body;
    if ("name" in body && "username" in body && "email" in body) {

        connection.connect();
        connection.query(`INSERT INTO users (id, name, username, email) VALUES (NULL, '${body.name}', '${body.username}', '${body.email}');`, (error, results, fields) => {
            if (error) { throw error }
            connection.end();
            res.status(201).json({
                user: body
            })
        });
    } else {
        res.status(400).json({
            msg: "Not enough information to create an user"
        })
    }
});

//Actualizar el usuario :id
app.put('/user/:id', (req, res) => {
    let body = req.body;
    res.json({
        user: body
    })
});

//Borrar el usuario :id
app.delete('/user/:id', (req, res) => {
    res.json('delete Usuario')
});

module.exports = app;