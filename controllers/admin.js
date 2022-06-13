
const panelAdministracion = (req,res)=>{  
    res.render('administracion',{
        nombrePagina: 'Panel de administración'
    })
}

module.exports ={
    panelAdministracion
}