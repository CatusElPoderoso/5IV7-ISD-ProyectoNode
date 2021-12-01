
// imports
const {Schema, model} = require('mongoose');

// SchemaNote
const SchemaNote = Schema({
    title: {
        type: String,
        required: true
   },
    description: {
        type: String,
        required: true
   },
    user: {
        type: String,
        required: true
   }
}, {timestamps: true });


// exports
module.exports = model('Note', SchemaNote);