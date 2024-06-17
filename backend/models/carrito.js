const mongoose = require('mongoose');

const CarritoSchema = new mongoose.Schema({
  ID_Usuario: String,
  Productos: [
    {
      ID_Producto: String,
      Cantidad: Number,
      Detalles: String
    }
  ],
  Estado: String
});

module.exports = mongoose.model('Carrito', CarritoSchema);
