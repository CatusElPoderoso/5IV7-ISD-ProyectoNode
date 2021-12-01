// imports
const mongoose = require('mongoose');

/** 
 * aquí se hace la conexión a la base de datos de  
 * mongoose, para que los usuarios puedan hacer uso correcto del CRUD
 */

const connection = async() => {
     try{
        await mongoose.connect(process.env.MONGODB_CNN); // intenta la conexión con mongoose
        console.log(`Base de datos iniciada correctamente`); // se conectó la base
     }catch (err) {
        throw new Error(`Hubo un error de conexión con la base de datos: \n${err}`); // la base no se pudo conectar D:
     };
};

// exports
module.exports = connection;