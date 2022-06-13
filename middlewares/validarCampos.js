const { validationResult } = require('express-validator');

const validarGrupo = async(req,res,next)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        req.flash('error', errors.array().map(error => error.msg));

        res.redirect('/grupos/nuevo');

        return;
    }

    next();
    
}

module.exports = {
    validarGrupo
}