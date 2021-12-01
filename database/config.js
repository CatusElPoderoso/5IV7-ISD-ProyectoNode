
// imports
const mongoose = require( 'mongoose' );


// connection
const connection = async() => {

    try {
        await mongoose.connect( process.env.MONGODB_CNN );
        console.log( `Base de datos distribuida conectada` );
    } catch ( err ) {
        throw new Error( `Error de conexion con la base de datos distribuida \n${ err }` );
    };

};


// exports
module.exports = connection;