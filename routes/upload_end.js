const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

app.use(fileUpload());

app.post('/uploadfile', function(req, res) {
  console.log(req.files); // list of the files
  console.log(req.body); // request body, like email
  
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  let file = req.files.image;

  // Use the mv() method to place the file somewhere on your server
  // file.mv('/somewhere/on/your/server/filename.jpg', function(err) {

  file.mv(file.name, function(err, success) {
      if (err){
        return res.status(500).send(err);
      }
      if (success)
      {
        return res.json({ success: true });
        // return res.send('File uploaded!');
      }
  });
});

module.exports = app;