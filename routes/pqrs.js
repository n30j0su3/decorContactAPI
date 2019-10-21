// Require packages and set the port
const express = require('express');
const app = express();
const pool = require('../routes/pool');
let id_new = 0;
//Requiere nodemailer for emails
const nodeMailer = require('nodemailer');
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
                pass: '' // generated ethereal password
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
                pass: '' // generated ethereal password
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