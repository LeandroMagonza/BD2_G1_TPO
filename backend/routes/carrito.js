const express = require('express');
const router = express.Router();
const Carrito = require('../models/carrito');

router.get('/', async (req, res) => {
  const carritos = await Carrito.find();
  res.json(carritos);
});

router.post('/', async (req, res) => {
  const carrito = new Carrito(req.body);
  await carrito.save();
  res.json(carrito);
});

// PUT (Update) Carrito
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const carrito = await Carrito.findByIdAndUpdate(id, req.body, { new: true });
    res.json(carrito);
  });
  
// DELETE Carrito
router.delete('/:id', async (req, res) => {
const { id } = req.params;
await Carrito.findByIdAndDelete(id);
res.json({ message: 'Carrito eliminado' });
});

module.exports = router;
