const express = require('express');
const router = express.Router();
const { crearDetalleReserva, getDetallesReserva, updateDetalleReserva, deleteDetalleReserva } = require('../controllers/detalleReservaController');
const auth = require('../middleware/auth');

router.post('/', auth, crearDetalleReserva);
router.get('/:reservaId', auth, getDetallesReserva);
router.put('/:id', auth, updateDetalleReserva);
router.delete('/:id', auth, deleteDetalleReserva);

module.exports = router;