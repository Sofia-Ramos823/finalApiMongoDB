const Cliente = require('../models/Cliente');

exports.getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find().select('-password');
    res.json(clientes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};

exports.getCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id).select('-password');
    if (!cliente) {
      return res.status(404).json({ msg: 'Cliente no encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};

exports.updateCliente = async (req, res) => {
  try {
    const { nombre, email, telefono } = req.body;
    const cliente = await Cliente.findByIdAndUpdate(
      req.params.id,
      { nombre, email, telefono },
      { new: true }
    ).select('-password');
    if (!cliente) {
      return res.status(404).json({ msg: 'Cliente no encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};

exports.deleteCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndRemove(req.params.id);
    if (!cliente) {
      return res.status(404).json({ msg: 'Cliente no encontrado' });
    }
    res.json({ msg: 'Cliente eliminado' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};