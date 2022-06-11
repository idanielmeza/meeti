const {Router} = require('express');
const {formCrearCuenta, crearCuenta, formLogin, iniciarSesion,confirmarCuenta} = require('../controllers/auth');

const router = Router();

router.get('/crear-cuenta', formCrearCuenta);
router.post('/crear-cuenta', crearCuenta);

router.get('/iniciar-sesion', formLogin);
router.post('/iniciar-sesion', iniciarSesion);

router.get('/confirmar-cuenta/:email', confirmarCuenta)

module.exports = router;