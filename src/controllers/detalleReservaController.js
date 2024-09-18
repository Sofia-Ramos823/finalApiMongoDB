const DetalleReserva = require('../models/DetalleReserva');

exports.crearDetalleReserva = async (req, res) => {
  try {
    const { reserva, servicio, cantidad, precio } = req.body;
    const detalleReserva = new DetalleReserva({ reserva, servicio, cantidad, precio });
    await detalleReserva.save();
    res.json(detalleReserva);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};

exports.getDetallesReserva = async (req, res) => {
  try {
    const detallesReserva = await DetalleReserva.find({ reserva: req.params.reservaId }).populate('reserva');
    res.json(detallesReserva);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};

exports.updateDetalleReserva = async (req, res) => {
  try {
    const { servicio, cantidad, precio } = req.body;
    const detalleReserva = await DetalleReserva.findByIdAndUpdate(
      req.params.id,
      { servicio, cantidad, precio },
      { new: true }
    ).populate('reserva');
    if (!detalleReserva) {
      return res.status(404).json({ msg: 'Detalle de reserva no encontrado' });
    }
    res.json(detalleReserva);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};

exports.deleteDetalleReserva = async (req, res) => {
  try {
    const detalleReserva = await DetalleReserva.findByIdAndRemove(req.params.id);
    if (!detalleReserva) {
      return res.status(404).json({ msg: 'Detalle de reserva no encontrado' });
    }
    res.json({ msg: 'Detalle de reserva eliminado' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};