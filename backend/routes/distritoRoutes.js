const express = require('express');
const router = express.Router();
const controller = require('../controllers/distritoController');

router.get('/', controller.listarDistritos);
router.post('/', controller.crearDistrito);
router.get('/:id_dis', controller.obtenerDistrito);
router.put('/:id_dis', controller.actualizarDistrito);
router.delete('/:id_dis', controller.eliminarDistrito);

module.exports = router;
