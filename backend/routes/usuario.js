const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const redisClient = require('../config/redis');
const Carrito = require('../models/carrito');

// GET Usuarios
router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM Usuario');
  res.json(result.rows);
});

// POST Usuario
router.post('/', async (req, res) => {
  const { Nombre, Direccion, Documento_de_identidad, Contrasenia, Tiempo_de_conexion, Categoría_de_usuario } = req.body;
  const result = await pool.query(
    'INSERT INTO Usuario (Nombre, Direccion, Documento_de_identidad, Contrasenia, Tiempo_de_conexion, Categoría_de_usuario) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [Nombre, Direccion, Documento_de_identidad, Contrasenia, Tiempo_de_conexion, Categoría_de_usuario]
  );
  res.json(result.rows[0]);
});

// PUT (Update) Usuario
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { Nombre, Direccion, Documento_de_identidad, Contrasenia, Tiempo_de_conexion, Categoría_de_usuario } = req.body;
  const result = await pool.query(
    'UPDATE Usuario SET Nombre = $1, Direccion = $2, Documento_de_identidad = $3, Contrasenia = $4, Tiempo_de_conexion = $5, Categoría_de_usuario = $6 WHERE ID_usuario = $7 RETURNING *',
    [Nombre, Direccion, Documento_de_identidad, Contrasenia, Tiempo_de_conexion, Categoría_de_usuario, id]
  );
  res.json(result.rows[0]);
});

// DELETE Usuario
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM Usuario WHERE ID_usuario = $1', [id]);
  res.json({ message: 'Usuario eliminado' });
});

// POST Login
router.post('/login', async (req, res) => {
    const { Documento_de_identidad, Contrasenia } = req.body;
    const result = await pool.query(
      'SELECT * FROM Usuario WHERE Documento_de_identidad = $1 AND Contrasenia = $2',
      [Documento_de_identidad, Contrasenia]
    );
  
    if (result.rows.length > 0) {
      const usuario = result.rows[0];
      const sessionKey = `session:${usuario.id_usuario}`;
  
      // Obtener la sesión anterior
      redisClient.hgetall(sessionKey, async (err, session) => {
        if (err) {
          return res.status(500).json({ error: 'Error obteniendo sesión' });
        }
  
        let carrito;
  
        if (session && session.carrito_id) {
          // Si hay un carrito en la sesión anterior
          carrito = await Carrito.findById(session.carrito_id);
        } else {
          // Si no hay carrito en la sesión anterior, crear uno nuevo
          carrito = new Carrito({ ID_usuario: usuario.id_usuario, lista_de_productos: [], estado: 'pendiente' });
          await carrito.save();
        }
  
        // Crear nueva sesión
        const sessionData = {
          start_time: new Date().toISOString(),
          activity: 'logged in',
          carrito_id: carrito._id.toString()
        };
  
        redisClient.hmset(sessionKey, sessionData, (err, reply) => {
          if (err) {
            return res.status(500).json({ error: 'Error creando sesión' });
          }
  
          res.json({
            message: 'Login exitoso',
            session: sessionData,
            carrito: carrito
          });
        });
      });
    } else {
      res.status(401).json({ error: 'Documento de identidad o contrasenia incorrectos' });
    }
  });

module.exports = router;
