const express = require('express');
const router = express.Router();
const Producto = require('../models/producto');

router.get('/', async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
});

router.post('/', async (req, res) => {
  const producto = new Producto(req.body);
  await producto.save();
  res.json(producto);
});

// PUT (Update) Producto
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id, req.body, { new: true });
    res.json(producto);
  });
  
  // DELETE Producto
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Producto.findByIdAndDelete(id);
    res.json({ message: 'Producto eliminado' });
});

module.exports = router;
