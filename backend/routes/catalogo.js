const express = require('express');
const router = express.Router();
const Catalogo = require('../models/catalogo');

router.get('/', async (req, res) => {
  const catalogos = await Catalogo.find();
  res.json(catalogos);
});

router.post('/', async (req, res) => {
  const catalogo = new Catalogo(req.body);
  await catalogo.save();
  res.json(catalogo);
});

// Añade PUT y DELETE según sea necesario

module.exports = router;
