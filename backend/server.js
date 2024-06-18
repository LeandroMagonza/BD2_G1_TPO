const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());

// Rutas
app.use('/usuarios', require('./routes/usuario'));
app.use('/pedidos', require('./routes/pedido'));
app.use('/facturas', require('./routes/factura'));
app.use('/pagos', require('./routes/pago'));
app.use('/carritos', require('./routes/carrito'));
app.use('/productos', require('./routes/producto'));
app.use('/catalogos', require('./routes/catalogo'));
app.use('/sesiones', require('./routes/sesion'));

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
