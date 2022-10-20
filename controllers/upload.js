const { response, request } = require("express");
const path = require('path');
const { v4: uuidv4 } = require('uuid');



const upload = async (req = request, res = response) => {  

    const  { file } = req.files ;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        msg: 'No files were uploaded'
      });
    }

    const nameFileCut = file.name.split('.');
    const extension = nameFileCut[ nameFileCut.length - 1];

    const validExtensions = ['jpg', 'png', 'jfif'];

    if( !validExtensions.includes(extension)) {
        return res.status(400).json({
            msg: `The extension ${extension} is not allowed, only ${validExtensions}`
        })
    }

    
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    const tempName = uuidv4() + '.' + extension;
    const uploadPath = path.join(__dirname, '../uploads', tempName);
  
    // Use the mv() method to place the file somewhere on your server
    file.mv(uploadPath, (err) => {
      if (err) return res.status(500).json({
        msg: err
      });
  
      res.json({
        msg: `File uploaded to ${uploadPath}`
      });
    });
};

module.exports = {
    upload
}