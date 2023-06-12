// server.js
const express = require('express');
const app = express();
const authRoutes = require('./auth');
const ticketRoutes = require('./tickets');

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api', ticketRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
