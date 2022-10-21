const { response, request } = require("express");
const path = require('path');
const { uploadFile } = require("../helpers");



const upload = async (req = request, res = response) => {  

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        msg: 'No files were uploaded'
      });
    }
    try { //Debido a que la promesa del uploadFile() puede regresar un reject, ese reject lo manejamos con un try y catch
      const fileName = await uploadFile(req.files, undefined, 'imgs'); // Se pone undefined si no queremos utilizar esa propiedad y que utilice el valor que viene por defecto. Si no tiene un valor por defecto entonces ahi su valor si sera undefined y tirara un error  

      res.json({
        fileName
      })

    } catch (err) {
      res.status(400).json({
        err
      })
    }
};

const updateImage = async ( req = request, res = response ) => {
    const {id, collection} = req.params;

    res.status(200).json({
        id,
        collection
    })
}

module.exports = {
    upload,
    updateImage
}