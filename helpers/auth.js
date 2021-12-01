
// imports
const {request, response} = require( 'express');


// auth
const auth = (req = request, res = response, next) => {

    if (req.isAuthenticated()) return next();
    req.flash('error', 'Hyeee rancio necesitas iniciar sesion primero')
    res.redirect('/login');

};


// exports
module.exports = auth;