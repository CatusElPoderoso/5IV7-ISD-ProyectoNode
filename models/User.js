
// imports
const {Schema, model} = require('mongoose');

// SchemaUser
const SchemaUser = Schema({
    email: {
        type: String,
        required: true,
        unique: true
   },
    password: {
        type: String,
        required: true
   }
}, {timestamps: true});

// exports
module.exports = model('User', SchemaUser);