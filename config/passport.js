// imports
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcryptjs = require('bcryptjs');

// el programa revisa la contraseña y el correo ingresado
passport.use(new LocalStrategy ({
    // objeto con los campos de contraseña y correo
    usernameField: 'email',
    passwordField: 'password'
}, async(email, password, done) => { // cuando el usuario ya ingresó contraseña y correo
    const user = await User.findOne({email});
    if(!user){ 
        // si el usuario no coincide con nignuna cuenta dentro de la base de datos 
        // entonces suelta el mensaje
        return done(null, false, {message: 'Este correo no está relacionado con nignuna cuenta'});
    }else{ 
        
        // en caso de que el correo ingresado coincida con uno dentro de la
        // base de datos, entonces el programa pasa a comprobar que la contraseña 
        // también coincida con la guardada en esta cuenta

        const match = bcryptjs.compareSync(password, user.password); // si coinciden
        if(match){
            // entonces inicia la cuenta que corresponda al usuario
            return done(null, user);
        }else{ // en caso de que no coincidan

            // entonces el sistema notifica al usuario que la contraseña
            // relacionada con ese correo no coincide con el que se dio al 
            // registrar la cuenta

            return done(null, false, {message: 'La contraseña ingresada es incorrecta'});
        };
    };
}));

// serializa, o inicia sesión, al usuario usando su ID
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// deserializa al usuario, o le cierra la sesión, tomando su ID
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
   });
})