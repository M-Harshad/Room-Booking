const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all routes (globally)
app.use(cors({
  origin: 'http://localhost:5173',  // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Define allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Define allowed headers
}));

// Enable Express to handle JSON request bodies
app.use(express.json());

// Example registration route
app.post('/api/register', (req, res) => {
  // Handle registration logic here
  console.log(req.body);  // Print the registration data
  res.status(201).send({ message: 'User registered successfully' });
});

// Start the server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));

