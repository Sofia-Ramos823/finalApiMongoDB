const Cliente = require('../models/Cliente');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { nombre, email, telefono, password } = req.body;
    let cliente = await Cliente.findOne({ email });
    if (cliente) {
      return res.status(400).json({ msg: 'El cliente ya existe' });
    }
    cliente = new Cliente({ nombre, email, telefono, password });
    const salt = await bcrypt.genSalt(10);
    cliente.password = await bcrypt.hash(password, salt);
    await cliente.save();
    const payload = { cliente: { id: cliente.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let cliente = await Cliente.findOne({ email });
    if (!cliente) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }
    const isMatch = await bcrypt.compare(password, cliente.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }
    const payload = { cliente: { id: cliente.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};