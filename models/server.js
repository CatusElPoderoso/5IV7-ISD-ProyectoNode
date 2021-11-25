
// imports
const express = require( 'express' );
const connection = require( '../database/config' );

// Servidor
class Server {
    // constructor
    constructor() {
        this.app = express();
        this.puerto = process.env.PORT;
        this.dbConnection();
        this.middlewares();
        this.routes();
    };

    // conección bd
    async dbConnection() {
        await connection();
    };


    // public
    middlewares() {
        this.app.use( express.static( 'public' ) );
    };

    // ruta /
    routes() {
        this.app.get( '/', ( req, res ) => {
            res.sendFile(__dirname + '/00-index.html');
        });
    };

    // puerto al index
    listen() {
        this.app.listen( this.puerto, () => {
            console.log(`Link a la página... http://localhost:${this.puerto}/00-index.html`);
        });
    };
};


// exports
module.exports = Server;