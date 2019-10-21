// Require packages and set the port
const express = require('express');
const app = express();
const pool = require('../pool');

//Tempo
let users={
    1:{
        id: '1',
        name: 'test-name1'
    },
    2:{
        id: '2',
        name: 'test-name2'
    }
}

/*
To read the object (from database) and return the info
*/
app.get('/users', (req, res) => {
    return res.send(Object.values(users));
});
app.get('/users/:id', (req, res) => {
    return res.send(users[req.params.id]);
});

//Basic get response - works like example
/*
app.get('/users', (req, res) => {
    return res.send('GET HTTP method on user resource');
});*/
app.post('/users', (req, res) => {
    return res.send('POST HTTP method on user resource');
});
app.put('/users/:userId', (req, res) => {
    return res.send(
        `PUT HTTP method on user/${req.params.userId} resource`,
    );
});
app.delete('/users/:userId', (req, res) => {
    return res.send(
        `DELETE HTTP method on user/${req.params.userId} resource`,
    );
});

// Export the app
module.exports = app;