// imports
const {request, response} = require('express');

/** 
 * Este es el mensaje que visualiza el usuario cuando quiere agregar  
 * notas, pero no ha iniciado sesión 
 */

const auth = (req = request, res = response, next) => {
    if (req.isAuthenticated()) return next();
    req.flash('error', 'Antes de agregar notas debes iniciar sesión') // mensaje de error
    res.redirect('/login'); // redirecciona a iniciar sesión
};

// exports
module.exports = auth;