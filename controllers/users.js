//Es necesario hacer esto para tener el tipado (para que nos rellene automaticamente cuando necesitemos poner un metodo con "req" o "res");
//Es solo para agilizar el llenado de codigo, no es necesario hacerlo
const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../database/user');

const usersGet = (req = request, res = response) => {

    const {q, nombre = 'no name', apikey, page = 1, limit} = req.query;

    res.json(
        {
            msg: 'get response - controller',
            q,
            nombre,
            apikey, 
            page,
            limit
        }
    );
};

const usersPost = async (req = request, res = response) => {
    const {name, password, role, email} = req.body;
    const user = new User({name, password, role, email}); //Aqui solo creamos la instancia de la inserccion en la base de datos

    // Verificar si el correo existe

    // Encriptar la contraseña 
    const salt = bcryptjs.genSaltSync(10); //10 es el valor por defecto aunque no se lo pongamos. El numero que pongamos como parametro es el numero de vueltas que se le dara la encryptacion, es decir, entre mas vueltas, mas segura la encriptacion, pero el numero intermedio de seguridad es 10.
    user.password = bcryptjs.hashSync(password, salt); //Como primer parametro nos pide el string que queremos encriptar y como segundo el salt.Con esto creamos un hash de esa contraseña y por lo tanto la encriptamos. El hash sirve para que cuando hackeen nuestra base de datos o alguien mas la vea, no pueda saber nadie, cual es la verdadera contraseña de los usuarios. No importa que otros usuarios tengan la misma contraseña, cada hash sera totalmente diferente.

    // Guardar en DB
    await user.save(); //Aca guardamos esa instancia y la enviamos a la base de datos, siempre y cuando se cumplan todos los requisitos de nuestro modelo de usuario 

    res.json(
        {
            msg: 'post response - controller',
            user
        }
    );
};
const usersPut = (req = request, res = response) => {
    res.json(
        {
            msg: 'put response - controller'
        }
    );
};
const usersPatch = (req = request, res = response) => {
    res.json(
        {
            msg: 'patch response - controller'
        }
    );
};

const usersDelete = (req = request, res = response) => {
    res.json(
        {
            msg: 'delete response - controller'
        }
    );
};

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}