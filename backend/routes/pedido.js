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

// Añade PUT y DELETE según sea necesario

module.exports = router;
