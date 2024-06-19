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

module.exports = router;
