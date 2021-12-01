// imports
const {request, response} = require('express');
const User = require('../models/usuarios');
const bcryptjs = require('bcryptjs');
const passport = require('passport');

// getLogin
const getLogin = (req = request, res = response) => {

    res.render('login', {
        title: 'Iniciar sesion'
   });

};


// postLogin
const postLogin = passport.authenticate('local', {

    failureRedirect: '/login',
    successRedirect: '/notes',
    failureFlash: true

});


// getRegister
const getRegister = (req = request, res = response) => {

    res.render('register', {
        title: 'Crear cuenta'
   });

};


// postRegister
const postRegister = async(req = request, res = response) => {

    const errors = [];
    const {email, password, reppassword} = req.body;
    if (password != reppassword) {
        errors.push({text: 'Las contraseñas no coinciden'});
   };
    if (password.length < 4) {
        errors.push({text: 'Las contraseñas deben ser mayor a 4 carácteres'});
   };
    if (errors.length > 0) {
        res.render('register', {
            title: 'Crear cuenta',
            errors,
            email
       });
   } else {
        const existeCorreo = await User.findOne({email});
        if (existeCorreo) {
            errors.push({text: 'Ooops !! ese correo ya esta registrado'});
            res.render('register', {
                title: 'Crear cuenta',
                errors,
                email
           });
       } else {
            const succes = [];
            const user = new User({email, password});
            const salt = await bcryptjs.genSalt(10);
            user.password = bcryptjs.hashSync(password, salt);
            succes.push({text: 'Te has registrado correctamente en TaskX !!! ahora iniciamos sesion uwu'})
            await user.save();
            res.render('login', {
                title: 'Iniciar sesion',
                succes
           });
       }
   }

};


// getLogout
const getLogout = (req = request, res = response) => {

    req.logout();
    req.flash('success_msg', 'Sesion cerrada con existo');
    res.redirect('/login');

};


// exprots
module.exports = {
    getLogin,
    postLogin,
    getRegister,
    postRegister,
    getLogout
};