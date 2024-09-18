const mongoose = require('mongoose');

const DetalleReservaSchema = new mongoose.Schema({
  reserva: { type: mongoose.Schema.Types.ObjectId, ref: 'Reserva', required: true },
  servicio: { type: String, required: true },
  cantidad: { type: Number, required: true },
  precio: { type: Number, required: true },
});

module.exports = mongoose.model('DetalleReserva', DetalleReservaSchema);