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

// PUT (Update) Pago
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { ID_factura, Medio_de_pago, Operador_interviniente, Fecha_y_hora_del_pago, Monto } = req.body;
    const result = await pool.query(
      'UPDATE Pago SET ID_factura = $1, Medio_de_pago = $2, Operador_interviniente = $3, Fecha_y_hora_del_pago = $4, Monto = $5 WHERE ID_pago = $6 RETURNING *',
      [ID_factura, Medio_de_pago, Operador_interviniente, Fecha_y_hora_del_pago, Monto, id]
    );
    res.json(result.rows[0]);
  });
  
// DELETE Pago
router.delete('/:id', async (req, res) => {
const { id } = req.params;
await pool.query('DELETE FROM Pago WHERE ID_pago = $1', [id]);
res.json({ message: 'Pago eliminado' });
});
  
module.exports = router;
