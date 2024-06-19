const express = require('express');
const router = express.Router();
const Carrito = require('../models/carrito');

// POST Crear Carrito
router.post('/', async (req, res) => {
  const { ID_usuario, lista_de_productos, estado } = req.body;

  try {
    const nuevoCarrito = new Carrito({ ID_usuario, lista_de_productos, estado });
    await nuevoCarrito.save();

    // Construir la respuesta manualmente
    const respuesta = {
      _id: nuevoCarrito._id,
      ID_usuario: nuevoCarrito.ID_usuario,
      lista_de_productos: nuevoCarrito.lista_de_productos,
      estado: nuevoCarrito.estado
    };

    res.status(201).json(respuesta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el carrito', error: error.message });
  }
});

// GET Carrito por ID de usuario
router.get('/:ID_usuario', async (req, res) => {
  const { ID_usuario } = req.params;

  try {
    const carrito = await Carrito.findOne({ ID_usuario:+ID_usuario });
    if (!carrito) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    res.json(carrito);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el carrito', error: error.message });
  }
});

// DELETE Eliminar Carrito por ID de usuario
router.delete('/:ID_usuario', async (req, res) => {
  const { ID_usuario } = req.params;

  try {
    const result = await Carrito.findOneAndDelete({ ID_usuario });
    if (!result) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }
    res.json({ message: 'Carrito eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el carrito', error: error.message });
  }
});

// DELETE Eliminar Producto del Carrito por ID de usuario e ID de producto
router.delete('/:ID_usuario/productos/:ID_producto', async (req, res) => {
  const { ID_usuario, ID_producto } = req.params;

  try {
    const carrito = await Carrito.findOne({ ID_usuario });
    if (!carrito) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    const initialLength = carrito.lista_de_productos.length;
    carrito.lista_de_productos = carrito.lista_de_productos.filter(
      producto => producto.ID_producto.toString() !== ID_producto
    );

    if (carrito.lista_de_productos.length === initialLength) {
      return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
    }

    await carrito.save();

    // Construir la respuesta manualmente
    const respuesta = {
      _id: carrito._id,
      ID_usuario: carrito.ID_usuario,
      lista_de_productos: carrito.lista_de_productos,
      estado: carrito.estado
    };

    res.json(respuesta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar producto del carrito', error: error.message });
  }
});

// POST Agregar Producto al Carrito
router.post('/:ID_usuario/productos', async (req, res) => {
  const { ID_usuario } = req.params;
  const { ID_producto, nombre, cantidad, precio } = req.body;

  try {
    const carrito = await Carrito.findOne({ ID_usuario });
    if (!carrito) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    carrito.lista_de_productos.push({ ID_producto, nombre, cantidad, precio });
    await carrito.save();

    // Construir la respuesta manualmente
    const respuesta = {
      _id: carrito._id,
      ID_usuario: carrito.ID_usuario,
      lista_de_productos: carrito.lista_de_productos,
      estado: carrito.estado
    };

    res.json(respuesta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar producto al carrito', error: error.message });
  }
});

module.exports = router;
