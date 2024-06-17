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

// Añade PUT y DELETE según sea necesario

module.exports = router;
