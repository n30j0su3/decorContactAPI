// Require packages and set the port
const express = require('express');
const app = express();
const pool = require('../routes/pool');
//const fs = require('fs')
let id_new = 0;
//Requiere nodemailer for emails
const nodeMailer = require('nodemailer');
//require multer for the file uploads
const multer = require('multer');
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