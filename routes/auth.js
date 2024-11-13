const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin'); // Use Admin model instead of Employee
const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key'; // Use your secret key from .env

// Register Route
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin
        const newAdmin = new Admin({
            name,
            email,
            password: hashedPassword,
            role: role || 'admin',  // Default role will be 'admin'
        });

        await newAdmin.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: admin._id, role: admin.role }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Logout Route (Optional, since JWT is stateless)
router.post('/logout', (req, res) => {
    // You can optionally handle logout by clearing the token on the client side
    res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
