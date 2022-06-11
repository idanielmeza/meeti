const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuarios = require('../models/Usuarios');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        //El codigo se ejecuta al llenar el fomrulario
        const usuario = await Usuarios.findOne({
            where: {
                email
            }
        });

        //revisar si existe
        if (!usuario) {
            return done(null, false, {
                message: 'El correo no existe'
            })
        }

        //revisar si esta activo
        if(!usuario.activo){
            return done(null, false, {
                message: 'El correo no esta activo'
            })
        }

        //revisar si la contraseña es correcta
        if (!usuario.compararPassword(password)) {
            return done(null, false, {
                message: 'Contraseña incorrecta'
            })
        };

        //Si todo es correcto, devolver el usuario
        return done(null, usuario);

    }
))

passport.serializeUser(function(usuario,done){
    done(null,usuario);
});

passport.deserializeUser(function(usuario,done){
    done(null,usuario);
});

module.exports = passport;