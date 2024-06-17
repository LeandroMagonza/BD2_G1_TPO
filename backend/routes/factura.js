const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM Factura');
  res.json(result.rows);
});

router.post('/', async (req, res) => {
  const { ID_pedido, Fecha_de_emisión, Importe_total, Detalles_del_cliente, Detalles_de_pago } = req.body;
  const result = await pool.query(
    'INSERT INTO Factura (ID_pedido, Fecha_de_emisión, Importe_total, Detalles_del_cliente, Detalles_de_pago) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [ID_pedido, Fecha_de_emisión, Importe_total, Detalles_del_cliente, Detalles_de_pago]
  );
  res.json(result.rows[0]);
});

// Añade PUT y DELETE según sea necesario

module.exports = router;
