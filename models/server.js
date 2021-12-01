// improts
const express = require('express');
const path = require('path');
const connection = require('../database/config');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const passport = require('passport');
require('../config/passport');
const flash = require('connect-flash');
const session = require('express-session');

// Server
class Server {
    // constructor
    constructor() {
        this.app = express();
        this.puerto = process.env.PORT;
        this.dbConnection();
        this.settings();
        this.middlewares();
        this.routes();
   };

    // dbConnection
    async dbConnection() {
        await connection();
   };


    // settings
    settings() {
        this.views = process.env.VIEWS;
        this.app.set('views', this.views);
        this.app.engine('hbs', exphbs({
            layoutsDir: path.join(this.views, 'layouts'),
            partialsDir: path.join(this.views, 'partials'),
            extname: '.hbs',
            defaultLayout: 'main'
       }));
        this.app.set('view engine', '.hbs');
   };


    // middlewares
    middlewares() {
        this.app.use(express.static('public'));
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(methodOverride('_method'));
        this.app.use(session({
            secret: 'secret',
            resave: true,
            saveUninitialized: true
       }));
        this.app.use(flash());
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use((req, res, next) => {
            res.locals.succes_msg = req.flash('succes_msg');
            res.locals.error = req.flash('error');
            res.locals.user = req.user || null;
            next();
       });
   };


    // routes
    routes() {
        this.app.use(require('../routes/notes'));
        this.app.use(require('../routes/user'));
        this.app.use(require('../routes/index'));
   };


    // listen
    listen() {
        this.app.listen(this.puerto, () => {
            console.log(`Página hospedada en http://localhost:${this.puerto}`);
       });
   };
};

// exports
module.exports = Server;