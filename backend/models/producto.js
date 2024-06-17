const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  Nombre: String,
  Descripción: String,
  Fotos: [String],
  Comentarios: [String],
  Videos: [String],
  Precio: Number
});

module.exports = mongoose.model('Producto', ProductoSchema);
