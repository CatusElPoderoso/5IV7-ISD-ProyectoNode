// imports
const {Schema, model} = require('mongoose');

/** 
 * Este es el apartado en el que se configura la estructura y lo que necesitan  
 * las tareas que van a ser agregadas por el usuario, una vez este haya iniciado sesión
 */

const SchemaNote = Schema({
    title: { // título
        type: String,
        required: true
    },
    description: { // descripción
        type: String,
        required: true
    },
    user: { // usuario
        type: String,
        required: true
    }
}, {timestamps: true});

// exports
module.exports = model('Note', SchemaNote);