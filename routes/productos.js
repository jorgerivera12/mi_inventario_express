const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const ctrl = require('../controllers/productoController');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get('/',                   ctrl.listar);
router.get('/nuevo',              ctrl.formNuevo);
router.post('/',                  upload.single('imagen'), ctrl.crear);
router.get('/editar/:id',         ctrl.formEditar);
router.post('/actualizar/:id',    upload.single('imagen'), ctrl.actualizar);
router.post('/eliminar/:id',      ctrl.eliminar);

module.exports = router;
