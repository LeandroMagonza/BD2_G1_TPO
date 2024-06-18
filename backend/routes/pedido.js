const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM Pedido');
  res.json(result.rows);
});

router.post('/', async (req, res) => {
  const { ID_usuario, Lista_de_productos, Importe_de_artículos, Descuentos, Impuestos, Estado_del_pedido } = req.body;
  const result = await pool.query(
    'INSERT INTO Pedido (ID_usuario, Lista_de_productos, Importe_de_artículos, Descuentos, Impuestos, Estado_del_pedido) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [ID_usuario, Lista_de_productos, Importe_de_artículos, Descuentos, Impuestos, Estado_del_pedido]
  );
  res.json(result.rows[0]);
});

// PUT (Update) Pedido
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { ID_usuario, Lista_de_productos, Importe_de_artículos, Descuentos, Impuestos, Estado_del_pedido } = req.body;
    const result = await pool.query(
      'UPDATE Pedido SET ID_usuario = $1, Lista_de_productos = $2, Importe_de_artículos = $3, Descuentos = $4, Impuestos = $5, Estado_del_pedido = $6 WHERE ID_pedido = $7 RETURNING *',
      [ID_usuario, Lista_de_productos, Importe_de_artículos, Descuentos, Impuestos, Estado_del_pedido, id]
    );
    res.json(result.rows[0]);
  });
  
// DELETE Pedido
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM Pedido WHERE ID_pedido = $1', [id]);
    res.json({ message: 'Pedido eliminado' });
  });

// Asumiendo que el modelo de Carrito está definido en '../models/Carrito'

// POST Crear Pedido
router.post('/', async (req, res) => {
  const { ID_usuario, ID_carrito } = req.body;

  try {
    // Buscar carrito por ID de usuario o ID de carrito
    let carrito;
    if (ID_carrito) {
      carrito = await Carrito.findById(ID_carrito);
    } else if (ID_usuario) {
      carrito = await Carrito.findOne({ ID_usuario });
    }

    if (!carrito) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    const { Lista_de_productos } = carrito;

    // Calcular importe de artículos, descuentos e impuestos (aquí puedes implementar la lógica necesaria)
    const Importe_de_artículos = Lista_de_productos.reduce((acc, item) => acc + item.Cantidad * item.Detalles.Precio, 0);
    const Descuentos = 0; // Puedes agregar la lógica para calcular los descuentos
    const Impuestos = Importe_de_artículos * 0.1; // Ejemplo de impuestos (10%)

    // Crear el pedido en la base de datos
    const nuevoPedido = await pool.query(
      'INSERT INTO Pedido (ID_usuario, Lista_de_productos, Importe_de_artículos, Descuentos, Impuestos, Estado_del_pedido) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [ID_usuario || carrito.ID_usuario, JSON.stringify(Lista_de_productos), Importe_de_artículos, Descuentos, Impuestos, 'Pendiente']
    );

    // Eliminar el carrito después de crear el pedido (opcional)
    await Carrito.findByIdAndDelete(carrito._id);

    res.json(nuevoPedido.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el pedido' });
  }
});

module.exports = router;
