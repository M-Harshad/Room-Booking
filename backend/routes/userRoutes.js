const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require('jsonwebtoken'); // For generating authentication tokens


router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;
  
    try {
      // Check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Create new user instance
      const newUser = new User({
        username,
        email,
        password,
        role
      });
  
      // Save user to database
      await newUser.save();
  
      // Generate JWT token
      const token = jwt.sign(
        { _id: newUser._id, username: newUser.username, role: newUser.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }  // Token expiration time (1 hour)
      );
  
      // Return response with success message and token
      res.status(201).json({
        message: 'User registered successfully',
        token: token
      });
    } catch (error) {
      // Handle any errors that occur during registration
      res.status(500).json({
        message: 'Error registering user',
        error: error.message
      });
    }
  });

  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user exists in the database
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Compare the entered password with the stored hashed password
      if (password !== user.password) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { _id: user._id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      // Send response with the token
      res.status(200).json({
        message: 'Login successful',
        token: token
      });
  
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  });