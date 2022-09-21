const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.js');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.usersPath = '/api/users'

        //Database connection
        this.connectDB();

        //Middlewares
        this.middlewares();
        

        //Routes of my application
        this.routes();
    }


    async connectDB(){
        await dbConnection();
    }

    middlewares(){

        //Cors
        this.app.use(cors());

        //Lectura y parseo del body || este es estrictamente necesarios para que los bodys puedan enviar y recibir en formato json
        this.app.use(express.json());

        // Public directory
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.usersPath, require('../routes/users.js'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running in port: ' + this.port)
        });
    }
}

module.exports = Server;



