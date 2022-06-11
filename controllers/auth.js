const Usuarios = require('../models/usuarios');
const {enviarEmail} = require('../handler/emails');

const formCrearCuenta = (req, res) => {
    res.render('crear-cuenta',{
        nombrePagina: 'Crear Cuenta'
    });
}

const crearCuenta = async(req,res)=>{

    const usuario = req.body;

    if (req.body.password !== req.body.password2) {
        req.flash('error', 'Las contraseñas no coinciden');
        res.redirect('/auth/crear-cuenta');
    }

    try{
        await Usuarios.create(usuario);

        //Url
        const url = `${req.headers.origin}/auth/confirmar-cuenta/${usuario.email}`;

        //Enviando email de confirmacion
        await enviarEmail({
            usuario,
            url,
            subject: 'Confirmar cuenta de Meeti',
            archivo: 'confirmar-cuenta'
        })

        req.flash('exito', 'Se ha enviado un correo para confirmar la cuenta');
        return res.redirect('/auth/iniciar-sesion');

    }catch(e){
        console.log(e);
        req.flash('error', e.errors.map(error => error.message));
        res.redirect('/auth/crear-cuenta');
    }

}

const formLogin = (req, res) => {
    res.render('iniciar-sesion',{
        nombrePagina: 'Iniciar Sesión'
    });
}

const confirmarCuenta = async(req,res,next)=>{
    const {email} = req.params;
    
    const usuario = await Usuarios.findOne({where:{email}});

    if(!usuario){
        req.flash('error', 'No existe un usuario con ese correo');
        return res.redirect('/');
    };

    usuario.activo = true;
    await usuario.save();

    req.flash('exito', 'Cuenta confirmada correctamente');
    res.redirect('/auth/iniciar-sesion');

}

module.exports = {
    formCrearCuenta,
    crearCuenta,
    formLogin,
    confirmarCuenta
}