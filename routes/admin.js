const {Router} = require('express');
const {panelAdministracion} = require('../controllers/admin');
const {autenticado} = require('../middlewares/autenticado');

const router = Router();

router.get('/',[
    autenticado,
] ,panelAdministracion);


module.exports = router;