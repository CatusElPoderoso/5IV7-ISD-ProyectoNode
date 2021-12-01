// imports
const {Schema, model} = require('mongoose');

/** 
 * Este es el controlador que guarda los datos que debe ingresar 
 * el usuario para poder agregar, editar y borrar las tareas que 
 * se manejan dentro de la base de datos
 */

const SchemaUser = Schema({
    email: { // para correo
        type: String,
        required: true,
        unique: true
   },
    password: { // para contraseña
        type: String,
        required: true
   }
}, {timestamps: true});

// exports
module.exports = model('User', SchemaUser);