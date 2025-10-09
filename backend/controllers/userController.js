const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, bloodGroup, phone, city } = req.body;

    if (!name || !email || !password || !bloodGroup || !phone || !city) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword, bloodGroup, phone, city });

    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ message: 'Login successful', token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search donors
const searchDonors = async (req, res) => {
  try {
    const { bloodGroup, city } = req.query;
    if (!bloodGroup || !city) return res.status(400).json({ message: 'Blood group and city required' });

    const donors = await User.find({ bloodGroup, city }).select('-password');
    res.json({ donors });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, searchDonors };
