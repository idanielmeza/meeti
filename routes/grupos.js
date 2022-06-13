const {Router} = require('express');
const {autenticado} = require('../middlewares/autenticado');
const {formNuevoGrupo, crearGrupo} = require('../controllers/grupos');
const {check} = require('express-validator');
const {validarGrupo} = require('../middlewares/validarCampos');

const router = Router();

router.get('/nuevo',[
    autenticado,
],formNuevoGrupo)

router.post('/nuevo',[
    check('nombre','El nombre es obligatorio').trim().notEmpty().escape(),
    check('descripcion','La descripcion es obligatoria').trim().notEmpty().escape(),
    check('url','La url es obligatoria').trim().notEmpty().escape(),
    check('categoria','La categoria es obligatoria').trim().notEmpty().escape(),
    validarGrupo,
    autenticado,
],crearGrupo)

module.exports = router;