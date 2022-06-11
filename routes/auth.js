const {Router} = require('express');
const {formCrearCuenta, crearCuenta, formLogin,confirmarCuenta} = require('../controllers/auth');
const {autenticado} = require('../middlewares/autenticado');

const router = Router();

router.get('/crear-cuenta', formCrearCuenta);
router.post('/crear-cuenta', crearCuenta);

router.get('/iniciar-sesion', formLogin);
router.post('/iniciar-sesion', autenticado);

router.get('/confirmar-cuenta/:email', confirmarCuenta)

module.exports = router;