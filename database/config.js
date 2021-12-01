// imports
const mongoose = require('mongoose');

// conexión a la base 
const connection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN); // intenta la conexión con mongoose
        console.log(`Base de datos iniciada`); // se conectó la base
   }catch (err) {
        throw new Error(`Hubo un error de conexión con la base de datos: \n${err}`); // la base no se pudo conectar D:
   };
};

// exports
module.exports = connection;