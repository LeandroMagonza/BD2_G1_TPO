const express = require('express');
const router = express.Router();
const Producto = require('../models/producto');

// GET Productos
router.get('/', async (req, res) => {
    try {
      const productos = await Producto.find();
      res.json(productos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener productos' });
    }
  });
  
  // POST Crear Producto
  router.post('/', async (req, res) => {
    const { nombre, stock, precio } = req.body;
    
    // Debugging logs

    if (typeof precio !== 'number') {
      return res.status(400).json({ message: 'El precio debe ser un número' });
    }
    if (typeof stock !== 'number') {
      return res.status(400).json({ message: 'El stock debe ser un número' });
    }
  
    try {
      const nuevoProducto = new Producto({ nombre, stock, precio });
      await nuevoProducto.save();
      
      // Construir la respuesta manualmente
      const respuesta = {
        _id: nuevoProducto._id,
        nombre: nuevoProducto.nombre,
        stock: nuevoProducto.stock,
        precio: nuevoProducto.precio
      };
      res.status(201).json(respuesta);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear el producto' });
    }
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
    console.log(id);
    await Producto.findByIdAndDelete(id);
    res.json({ message: 'Producto eliminado' });
});


module.exports = router;
