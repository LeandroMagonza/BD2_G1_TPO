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

// PUT (Update) Catálogo
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const catalogo = await Catalogo.findByIdAndUpdate(id, req.body, { new: true });
    res.json(catalogo);
});

// DELETE Catálogo
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Catalogo.findByIdAndDelete(id);
    res.json({ message: 'Catálogo eliminado' });
});

module.exports = router;
