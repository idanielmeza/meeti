const Categorias = require('../models/Categorias');
const Grupos = require('../models/Grupos');

const formNuevoGrupo = async(req,res) => {
    const categorias = await Categorias.findAll();
    res.render('nuevo-grupo',{
        nombrePagina: 'Nuevo Grupo',
        categorias
    })
}

const crearGrupo = async(req,res) => {

    const grupo = req.body;
    //Usuario que crea el grupo
    grupo.usuarioId = req.user.id;
    grupo.categoriaId = grupo.categoria;


    try {
        //Almacenar en la base de datos
        await Grupos.create(grupo);
        req.flash('exito','Grupo creado correctamente');
        res.redirect('/administracion');

    } catch (error) {
        console.log(error);
        req.flash('error', error)
        res.redirect('/grupos/nuevo')
    }

}

module.exports = {
    formNuevoGrupo,
    crearGrupo
}