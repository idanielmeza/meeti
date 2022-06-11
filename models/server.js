const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const meeti = require('../config/db');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 4000;

        this.paths = {
            home: '/',
            auth: '/auth',
        }
        this.middlewares();
        this.db();
        this.viewEngine();
        this.routes();
    }

    async db(){
        try {
            require('./Usuarios');
            await meeti.sync();
            console.log('Base de datos creada');
        } catch (error) {
            console.log(error);
        }
    }

    viewEngine(){
        this.app.use(expressLayouts)
        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(__dirname, '../views'));

    }

    middlewares(){
       
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));

        this.app.use(express.static('public'));

        //Habilitar cookie parser
        this.app.use(cookieParser());

        //Habilitar sesiones
        this.app.use(session({
            secret: process.env.SECRET,
            key: process.env.KEY,
            resave: false,
            saveUninitialized: false
        }));

        //Habilitar flash messages
        this.app.use(flash());
        this.app.use((req,res,next)=>{
            res.locals.mensajes = req.flash();
            next();
        })


    }

    routes(){
        this.app.use(this.paths.home, require('../routes/home'));
        this.app.use(this.paths.auth, require('../routes/auth'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

}

module.exports = Server;