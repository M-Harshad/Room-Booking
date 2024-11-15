const express = require("express");
const router = express.Router();
const User = require("../models/user");
const {  generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../utli/Jwtutli")
const jwt = require('jsonwebtoken'); // For generating authentication tokens



// Get all users (for admin purposes)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // Get all users
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});


router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;

    console.log(req.body);
    

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
      const AccessToken = generateAccessToken(newUser)
      const RefreshToken = generateRefreshToken(newUser)

       // Store the refresh token in an HTTP-only cookie
       res.cookie('refreshToken', RefreshToken, {
        httpOnly: true,  // This cookie can't be accessed by JavaScript (important for security)
        secure: process.env.NODE_ENV === 'production',  // Use HTTPS in production
        maxAge: 7 * 24 * 60 * 60 * 1000,  // Refresh Token is valid for 7 days
      });
  
      // Return response with success message and token
      res.status(200).json({
        message: 'User registered successfully',
        AccessToken: AccessToken,
        RefreshToken: RefreshToken,
        userId: newUser._id
      });
    } catch (error) {
      console.log({error})
      // Handle any errors that occur during registration
      res.status(500).json({
        message: 'Error registering user',
        error: error.message
      });
    }
  });

  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if the user exists in the database
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Compare the entered password with the stored hashed password
      if (password !== user.password) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Generate JWT token
      const AccessToken = generateAccessToken(user)
      const RefreshToken = generateRefreshToken(user)

      //  // Store the refresh token in an HTTP-only cookie
      //   res.cookie('refreshToken', RefreshToken, {
      //     httpOnly: true,
      //     // secure: process.env.NODE_ENV === 'production', 
      //     secure: false, 
      //     maxAge: 7 * 24 * 60 * 60 * 1000,  // Refresh Token is valid for 7 days
      //   });
  
      // Send response with the token
      res.status(200).json({
        message: 'Login successful',
        AccessToken: AccessToken,
        RefreshToken: RefreshToken,
        userId: user._id
      });
  
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  });

  router.post('/user/refresh-token', (req, res) => {

    const refreshToken = req.headers['authorization']?.split(' ')[1];


  if (!refreshToken) return res.status(401).send('Refresh Token is missing');

  // Verify the Refresh Token
  const verified = verifyRefreshToken(refreshToken);
  if (!verified) return res.status(403).send('Invalid or expired Refresh Token');

  // Generate a new Access Token
  const user = verified; 
  console.log({user})
  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);

  //  // Store the refresh token in an HTTP-only cookie
  //  res.cookie('refreshToken', newRefreshToken, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === 'production', 
  //   maxAge: 7 * 24 * 60 * 60 * 1000,  // Refresh Token is valid for 7 days
  // });
  

  res.json({ AccessToken: newAccessToken, RefreshToken: newRefreshToken });  // Send the new Access Token
});

router.get("/profile/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user in the database by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send user details in response (excluding password for security)
    const userDetails = {
      username: user.username,
      email: user.email,
      // Add more fields as needed
    };

    return res.json(userDetails);

  } catch (err) {
    console.error("Error fetching user details:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});



  module.exports = router;