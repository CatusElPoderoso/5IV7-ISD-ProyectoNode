// imports
const path = require('path');
const express = require('express');
require('../config/passport');
const flash = require('connect-flash');
const session = require('express-session');
const connection = require('../database/config');
const methodOverride = require('method-override');
const exphbs = require('express-handlebars');
const passport = require('passport');

// Server
class Server {

    /** 
     * En esta clase se crea
     * el constructor del servidor para que se inicie  
     * y abra correctamente, usando el puerto y las  
     * rutas especificadas en otros archivos
     */

    constructor() {
        this.app = express();
        this.puerto = process.env.PORT;
        this.dbConnection();
        this.routes();
        this.middlewares();
        this.settings();
    };
    // conexión a la base de datos
    async dbConnection() {
        await connection();
    };
    // las configuraciones de las vistas
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
            res.locals.success_msg = req.flash('success_msg');
            res.locals.error = req.flash('error');
            res.locals.user = req.user || null;
            next();
       });
    };

   /** 
    * las rutas que usa nuestro programa para que el usuario pueda navegar  
    * a través de este sin problemas
    */

    routes() {
        this.app.use(require('../routes/notes'));
        this.app.use(require('../routes/user'));
        this.app.use(require('../routes/index'));
    };

    // donde se carga el puerto de nuestra página
    listen() {
        this.app.listen(this.puerto, () => {
            console.log(`Página hospedada en http://localhost:${this.puerto}`);
       });
   };
};

// exports
module.exports = Server;