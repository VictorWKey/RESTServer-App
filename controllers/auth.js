const bcryptjs = require('bcryptjs');
const { response, request } = require("express");
const generateJWT = require('../helpers/generate-jwt.js');
const User = require('../models/user.js');

const login = async (req = request, res = response) => {

    try{
        //Validar email
        const {email, password} = req.body;

        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({
                msg: 'Invalid user credentials - Email'
            })
        }

        //Validar si esta activo
        if(!user.state){
            return res.status(400).json({
                msg: 'Invalid user credentials - state = false'
            })
        }

        //Validar password
        const validPassword = bcryptjs.compareSync(password, user.password); //Devuelve true si la contraseña enviada en la propiedad password es igual a la contraseña encriptada de la base datos de ese usuario
        if(!validPassword){
            return res.status(400).json({
                msg: 'Invalid user credentials - Password'
            })
        }

        //Enviar JWT
        const token = await generateJWT(user.id);


        res.json({
            user,
            token
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Ocurrio algo mal en el servidor'
        })

    }
};

module.exports = {
    login
}