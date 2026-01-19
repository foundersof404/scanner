const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const { query } = require('../db');
const { jwtSecret } = require('../config');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

const signupSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  password: Joi.string().min(8).max(255).required(),
  name: Joi.string().min(2).max(255).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  password: Joi.string().min(8).max(255).required(),
});

function signToken(user) {
  return jwt.sign({ sub: user.id, email: user.email }, jwtSecret, { expiresIn: '7d' });
}

router.post('/signup', async (req, res) => {
  const { error, value } = signupSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) {
    return res.status(400).json({ message: 'Invalid input', details: error.details });
  }

  const { email, password, name } = value;

  const existing = await query('SELECT id FROM users WHERE email = ?', [email]);
  if (existing.length) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const result = await query(
    'INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)',
    [email, passwordHash, name]
  );

  const user = { id: result.insertId, email, name };
  const token = signToken(user);

  res.status(201).json({ user, token });
});

router.post('/login', async (req, res) => {
  const { error, value } = loginSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) {
    return res.status(400).json({ message: 'Invalid input', details: error.details });
  }

  const { email, password } = value;
  const rows = await query('SELECT id, email, password_hash, name FROM users WHERE email = ?', [email]);
  const user = rows[0];
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = signToken(user);
  res.json({
    user: { id: user.id, email: user.email, name: user.name },
    token,
  });
});

router.delete('/account', authenticateToken, async (req, res) => {
  const userId = req.user.sub; // from JWT payload

  const result = await query('DELETE FROM users WHERE id = ?', [userId]);
  
  if (result.affectedRows === 0) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ message: 'Account deleted successfully' });
});

module.exports = router;


