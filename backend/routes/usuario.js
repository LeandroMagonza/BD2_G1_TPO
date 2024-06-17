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

// Añade PUT y DELETE según sea necesario

module.exports = router;
