const router = require('express').Router();
const ctrl = require('../controllers/productoController');
const subirImagen = require('../middleware/upload');

router.get('/',                ctrl.listar);
router.get('/nuevo',           ctrl.formNuevo);
router.post('/',               subirImagen, ctrl.crear);
router.get('/editar/:id',      ctrl.formEditar);
router.post('/actualizar/:id', subirImagen, ctrl.actualizar);
router.post('/eliminar/:id',   ctrl.eliminar);

module.exports = router;
