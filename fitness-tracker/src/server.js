const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Adjust path as necessary

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = require('./app'); // Assuming your app.js is in the same directory

// Connect to MongoDB
connectDB(); // Make sure this function connects to your MongoDB instance

// Define a default route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
