const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM Factura');
  res.json(result.rows);
});

// POST Factura
router.post('/', async (req, res) => {
    const { ID_pedido, Fecha_de_emisión, Importe_total, Detalles_del_cliente, Detalles_de_pago } = req.body;
    const nuevaFactura = new Factura({
      ID_pedido,
      Fecha_de_emisión,
      Importe_total,
      Detalles_del_cliente,
      Detalles_de_pago
    });
    await nuevaFactura.save();
    res.json(nuevaFactura);
  });
  

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { ID_pedido, Fecha_de_emisión, Importe_total, Detalles_del_cliente, Detalles_de_pago } = req.body;
    const result = await pool.query(
      'UPDATE Factura SET ID_pedido = $1, Fecha_de_emisión = $2, Importe_total = $3, Detalles_del_cliente = $4, Detalles_de_pago = $5 WHERE ID_factura = $6 RETURNING *',
      [ID_pedido, Fecha_de_emisión, Importe_total, Detalles_del_cliente, Detalles_de_pago, id]
    );
    res.json(result.rows[0]);
  });
  
// DELETE Factura
router.delete('/:id', async (req, res) => {
const { id } = req.params;
await pool.query('DELETE FROM Factura WHERE ID_factura = $1', [id]);
res.json({ message: 'Factura eliminada' });
});

module.exports = router;
