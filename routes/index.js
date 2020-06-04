const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const directoryPath = path.join('C:\\Windows\\Fonts', '');
router.get('/', function (req, res, next) {
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    let allFiles = [];
    files.forEach((file) => {
      const fileExtension = file.substr(file.lastIndexOf('.') + 1);
      if (fileExtension === 'ttf') {
        allFiles.push(file)
      }
    });
    res.send(allFiles)
  });
});
router.get('/file/:name', function (req, res, next) {
    var options = {
        root: path.join(directoryPath, ''),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    const fileName = req.params.name;
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err)
        } else {
            console.log('Sent:', fileName)
        }
    })
});

module.exports = router;
