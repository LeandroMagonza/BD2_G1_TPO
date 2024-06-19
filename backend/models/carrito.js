const mongoose = require('mongoose');

const ProductoEnCarritoSchema = new mongoose.Schema({
  ID_producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
  nombre: { type: String, required: true },
  cantidad: { type: Number, required: true },
  precio: { type: Number, required: true }
}, { _id: false });

const CarritoSchema = new mongoose.Schema({
  ID_usuario: { type: Number, required: true },
  lista_de_productos: [ProductoEnCarritoSchema],
  estado: { type: String, required: true }
});

module.exports = mongoose.model('Carrito', CarritoSchema);
