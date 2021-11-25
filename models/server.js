// imports
const express = require('express');
const connection = require('../database/config');
class Server{
    constructor(){
        this.app = express();
        this.puerto = process.env.PORT;
        this.dbConnection();
        this.middlewares();
        this.routes();
    };
    async dbConnection(){
        await connection();
    };
    middlewares(){
        this.app.use(express.static('public'));
    };
    routes(){
        this.app.get('/', (req, res) => {
            res.sendFile(__dirname + '/00-index.html');
        });
    };
    listen(){
        this.app.listen(this.puerto, () => {
            console.log(`Link a la página... http://localhost:${this.puerto}/00-index.html`);
        });
    };
};
// exports
module.exports = Server;