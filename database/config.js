
// imports
const mongoose = require( 'mongoose' );

// connection
const connection = async() => {
    try {
        await mongoose.connect( process.env.MONGODB_CNN );
        console.log( `Base de datos conectada` );
    } catch ( err ) {
        throw new Error( `Error de conexion de la base de datos: \n${ err }` );
    };
};

// exports
module.exports = connection;