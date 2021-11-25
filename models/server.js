// imports
const express = require( 'express' );
const connection = require( '../database/config' );

// Server
class Server {
    // constructor
    constructor() {
        this.app = express();
        this.puerto = process.env.PORT;
        this.dbConnection();
        this.middlewares();
        this.routes();
    };

    // dbConnection
    async dbConnection() {
        await connection();
    };


    // middlewares
    middlewares() {
        this.app.use( express.static( 'public' ) );
    };


    // routes
    routes() {
        // this.app.use( require( '../routes' ) );
        this.app.get( '/', ( req, res ) => {
            res.sendFile( 'index' );
        });
    };


    // listen
    listen() {
        this.app.listen( this.puerto, () => {
            console.log( `Escuchando en el puerto ${ this.puerto }` );
        });
    };
};


// exports
module.exports = Server;