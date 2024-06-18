const express = require('express');
const router = express.Router();

// POST Crear Carrito
router.post('/', async (req, res) => {
  const { ID_usuario, Lista_de_productos, Estado } = req.body;
  const nuevoCarrito = new Carrito({
    ID_usuario,
    Lista_de_productos,
    Estado
  });
  await nuevoCarrito.save();
  res.json(nuevoCarrito);
});

// DELETE Carrito
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Carrito.findByIdAndDelete(id);
  res.json({ message: 'Carrito eliminado' });
});

// POST Agregar Producto al Carrito
router.post('/:id/productos', async (req, res) => {
  const { id } = req.params;
  const { ID_Producto, Cantidad, Detalles } = req.body;

  try {
    const carrito = await Carrito.findById(id);
    if (!carrito) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    carrito.Lista_de_productos.push({ ID_Producto, Cantidad, Detalles });
    await carrito.save();
    res.json(carrito);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar producto al carrito' });
  }
});

// DELETE Eliminar Producto del Carrito
router.delete('/:id/productos/:productoId', async (req, res) => {
  const { id, productoId } = req.params;

  try {
    const carrito = await Carrito.findById(id);
    if (!carrito) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    carrito.Lista_de_productos = carrito.Lista_de_productos.filter(
      producto => producto.ID_Producto !== productoId
    );
    await carrito.save();
    res.json(carrito);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar producto del carrito' });
  }
});

module.exports = router;
