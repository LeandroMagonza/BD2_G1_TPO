const mongoose = require('mongoose');

const CatalogoSchema = new mongoose.Schema({
  Productos: [
    {
      ID_Producto: String,
      Descripciones: String,
      Fotos: [String],
      Comentarios: [String],
      Videos: [String]
    }
  ],
  Historial_Cambios: [
    {
      Cambio: String,
      Valor_Anterior: mongoose.Schema.Types.Mixed,
      Valor_Nuevo: mongoose.Schema.Types.Mixed,
      Operador: String,
      Fecha: Date
    }
  ]
});

module.exports = mongoose.model('Catalogo', CatalogoSchema);
