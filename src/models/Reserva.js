const mongoose = require('mongoose');

const ReservaSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  estado: { type: String, enum: ['pendiente', 'confirmada', 'cancelada'], default: 'pendiente' },
});

module.exports = mongoose.model('Reserva', ReservaSchema);