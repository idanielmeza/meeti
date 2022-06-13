const {Router} = require('express');
const {formCrearCuenta, crearCuenta, formLogin,confirmarCuenta} = require('../controllers/auth');
const {login} = require('../middlewares/autenticado');

const router = Router();

router.get('/crear-cuenta', formCrearCuenta);
router.post('/crear-cuenta', crearCuenta);

router.get('/iniciar-sesion', formLogin);
router.post('/iniciar-sesion', login);

router.get('/confirmar-cuenta/:email', confirmarCuenta)

module.exports = router;