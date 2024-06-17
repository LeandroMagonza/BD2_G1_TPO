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

// Añade PUT y DELETE según sea necesario

module.exports = router;
