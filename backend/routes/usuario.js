const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM Usuario');
  res.json(result.rows);
});

router.post('/', async (req, res) => {
  const { Nombre, Dirección, Documento_de_identidad, Tiempo_de_conexión, Categoría_de_usuario } = req.body;
  const result = await pool.query(
    'INSERT INTO Usuario (Nombre, Dirección, Documento_de_identidad, Tiempo_de_conexión, Categoría_de_usuario) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [Nombre, Dirección, Documento_de_identidad, Tiempo_de_conexión, Categoría_de_usuario]
  );
  res.json(result.rows[0]);
});

// PUT (Update) Usuario
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { Nombre, Dirección, Documento_de_identidad, Tiempo_de_conexión, Categoría_de_usuario } = req.body;
    const result = await pool.query(
      'UPDATE Usuario SET Nombre = $1, Dirección = $2, Documento_de_identidad = $3, Tiempo_de_conexión = $4, Categoría_de_usuario = $5 WHERE ID_usuario = $6 RETURNING *',
      [Nombre, Dirección, Documento_de_identidad, Tiempo_de_conexión, Categoría_de_usuario, id]
    );
    res.json(result.rows[0]);
  });
  
  // DELETE Usuario
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM Usuario WHERE ID_usuario = $1', [id]);
    res.json({ message: 'Usuario eliminado' });
  });

module.exports = router;
