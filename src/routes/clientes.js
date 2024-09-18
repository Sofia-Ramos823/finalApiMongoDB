const express = require('express');
const router = express.Router();
const { getClientes, getCliente, updateCliente, deleteCliente } = require('../controllers/clienteController');
const auth = require('../middleware/auth');

router.get('/', auth, getClientes);
router.get('/:id', auth, getCliente);
router.put('/:id', auth, updateCliente);
router.delete('/:id', auth, deleteCliente);

module.exports = router;