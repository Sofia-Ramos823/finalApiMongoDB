const Reserva = require('../models/Reserva');

exports.crearReserva = async (req, res) => {
  try {
    const { cliente, fechaInicio, fechaFin } = req.body;
    const reserva = new Reserva({ cliente, fechaInicio, fechaFin });
    await reserva.save();
    res.json(reserva);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};

exports.getReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find().populate('cliente', 'nombre email');
    res.json(reservas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};

exports.getReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id).populate('cliente', 'nombre email');
    if (!reserva) {
      return res.status(404).json({ msg: 'Reserva no encontrada' });
    }
    res.json(reserva);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};

exports.updateReserva = async (req, res) => {
  try {
    const { fechaInicio, fechaFin, estado } = req.body;
    const reserva = await Reserva.findByIdAndUpdate(
      req.params.id,
      { fechaInicio, fechaFin, estado },
      { new: true }
    ).populate('cliente', 'nombre email');
    if (!reserva) {
      return res.status(404).json({ msg: 'Reserva no encontrada' });
    }
    res.json(reserva);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};

exports.deleteReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndRemove(req.params.id);
    if (!reserva) {
      return res.status(404).json({ msg: 'Reserva no encontrada' });
    }
    res.json({ msg: 'Reserva eliminada' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};