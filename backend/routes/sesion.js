const express = require('express');
const router = express.Router();
const redisClient = require('../config/redis');

// GET (Retrieve) Sesión de Usuario
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const sessionKey = `session:${id}`;
  redisClient.hgetall(sessionKey, (err, session) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!session) {
      return res.status(404).json({ error: 'Sesión no encontrada' });
    }
    res.json(session);
  });
});

// PUT (Update) Sesión de Usuario
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { start_time, end_time, activity } = req.body;

  const sessionKey = `session:${id}`;
  const updatedSession = {
    start_time,
    end_time,
    activity
  };

  redisClient.hmset(sessionKey, updatedSession, (err, reply) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Sesión actualizada', session: updatedSession });
  });
});

// DELETE Sesión de Usuario
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const sessionKey = `session:${id}`;
  redisClient.del(sessionKey, (err, reply) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Sesión eliminada' });
  });
});

module.exports = router;
