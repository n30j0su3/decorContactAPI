// Require packages and set the port
const express = require('express');
const app = express();
const pool = require('../routes/pool');
let id_new = 0;
//Requiere nodemailer for emails
const nodeMailer = require('nodemailer');
const multer = require('multer');
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