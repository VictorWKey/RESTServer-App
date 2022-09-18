//Es necesario hacer esto para tener el tipado (para que nos rellene automaticamente cuando necesitemos poner un metodo con "req" o "res");
//Es solo para agilizar el llenado de codigo, no es necesario hacerlo
const {response, request} = require('express');

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

const usersPost = (req = request, res = response) => {
    const body = req.body;
    res.json(
        {
            msg: 'post response - controller',
            body
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