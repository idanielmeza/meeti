const Usuarios = require('../models/usuarios');

const formCrearCuenta = (req, res) => {
    res.render('crear-cuenta',{
        nombrePagina: 'Crear Cuenta'
    });
}

const crearCuenta = async(req,res)=>{

    console.log(req.body);

    if (req.body.password !== req.body.password2) {
        req.flash('error', 'Las contraseñas no coinciden');
        res.redirect('/auth/crear-cuenta');
    }

    try{
        await Usuarios.create(req.body);
        req.flash('exito', 'Se ha enviado un correo para confirmar la cuenta');
        return res.redirect('/auth/iniciar-sesion');

    }catch(e){

        req.flash('error', e.errors.map(error => error.message));
        res.redirect('/auth/crear-cuenta');
    }

}

const formLogin = (req, res) => {
    res.render('iniciar-sesion',{
        nombrePagina: 'Iniciar Sesión'
    });
}

const iniciarSesion = async(req,res)=>{
    console.log(req.body);
}

module.exports = {
    formCrearCuenta,
    crearCuenta,
    formLogin,
    iniciarSesion
}