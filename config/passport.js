
// imports
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcryptjs = require('bcryptjs');


passport.use(new LocalStrategy ({
    usernameField: 'email',
    passwordField: 'password'
}, async(email, password, done) => {

    const user = await User.findOne({email});
    if (!user) {
        return done(null, false, {message: 'Oops !! parece ser que el correo ingresado no pertenece a ninguna cuenta'});
   } else {
        const match = bcryptjs.compareSync(password, user.password);
        if (match) {
            return done(null, user);
       } else {
            return done(null, false, {message: 'Uy esa contraseña es incorreta !!'});
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
