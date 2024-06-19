const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Conectar a MongoDB
mongoose.connect('mongodb://mongo:27017/tiendaonline', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado a MongoDB');
}).catch(err => {
  console.error('Error al conectar a MongoDB:', err);
});

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/usuarios', require('./routes/usuario'));
app.use('/pedidos', require('./routes/pedido'));
app.use('/facturas', require('./routes/factura'));
app.use('/pagos', require('./routes/pago'));
app.use('/carritos', require('./routes/carrito'));
app.use('/productos', require('./routes/producto'));

// Servidor escuchando en puerto 3000
app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
