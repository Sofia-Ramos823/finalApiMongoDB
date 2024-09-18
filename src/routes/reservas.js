const express = require('express');
const router = express.Router();
const { crearReserva, getReservas, getReserva, updateReserva, deleteReserva } = require('../controllers/reservaController');
const auth = require('../middleware/auth');

router.post('/', auth, crearReserva);
router.get('/', auth, getReservas);
router.get('/:id', auth, getReserva);
router.put('/:id', auth, updateReserva);
router.delete('/:id', auth, deleteReserva);

module.exports = router;