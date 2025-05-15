const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

exports.signup = async (req, res) => {
  try {
    const { email, password, name, profileImage } = req.body;

    // Check if user already exists
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(409).json({ message: 'Email already in use' });

    // Validate inputs (basic)
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      username: name,
      profileImage // Optional: could be base64 or encrypted string
    });

    res.status(201).json({ message: '✅ User created successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '❌ Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'Missing email or password' });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      message: '✅ Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        profileImage: user.profileImage
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '❌ Server error' });
  }
};
