const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM Pago');
  res.json(result.rows);
});

router.post('/', async (req, res) => {
  const { ID_factura, Medio_de_pago, Operador_interviniente, Fecha_y_hora_del_pago, Monto } = req.body;
  const result = await pool.query(
    'INSERT INTO Pago (ID_factura, Medio_de_pago, Operador_interviniente, Fecha_y_hora_del_pago, Monto) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [ID_factura, Medio_de_pago, Operador_interviniente, Fecha_y_hora_del_pago, Monto]
  );
  res.json(result.rows[0]);
});

// Añade PUT y DELETE según sea necesario

module.exports = router;
