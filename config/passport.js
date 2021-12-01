
// imports
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcryptjs = require('bcryptjs');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async(email, password, done) => {

    const user = await User.findOne({email});
    if (!user) {
        return done(null, false, {message: 'El correo que ingresaste no pertenece a ninguna cuenta :c'});
    }else{
        const match = bcryptjs.compareSync(password, user.password);
        if (match) {
            return done(null, user);
        }else{
            return done(null, false,{message: 'Esa contraseña es incorrecta :/'});
        };
    };
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    });
})
