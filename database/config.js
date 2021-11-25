const mongoose = require('mongoose');
const connection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log(`La base se conectó correctamente c:`);
    }catch (err) {
        throw new Error(`Hubo un error con la base de datos\n${err}`);
    };
};
module.exports = connection;
