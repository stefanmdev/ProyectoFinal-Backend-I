import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { createHash, isValidPassword } from '../utils/bcrypt.js';

const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: 'El usuario ya existe' });

    const hashedPassword = createHash(password);

    const newUser = new User({
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Login
router.post('/login', async (req, res, next) => {
  passport.authenticate('login', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res
      .cookie('token', token, { httpOnly: true })
      .json({ message: 'Login exitoso', user: { id: user._id, email: user.email } });
  })(req, res, next);
});

// Current
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      email: req.user.email,
      role: req.user.role,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
    },
  });
});

export default router;
