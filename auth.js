// auth.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sandip@9903',
  database: 'tambula'
});

connection.connect(function(err) {  
    if (err) throw err;  
    console.log("Connected!");  
  });  

// Signup endpoint
router.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // Insert the user into the database
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  connection.query(sql, [username, password], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create user' });
    } else {
      res.json({ message: 'User created successfully' });
    }
  });
});

// Login endpoint
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  connection.query(sql, [username, password], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch user' });
    } else if (results.length === 0) {
      res.status(401).json({ error: 'Invalid username or password' });
    } else {
      res.json({ message: 'Login successful' });
    }
  });
});

module.exports = router;
