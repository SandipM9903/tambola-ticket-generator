// tickets.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const { generateTambulaTickets } = require('./tambula');

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sandip@9903',
  database: 'tambula'
});

// Create ticket endpoint
router.post('/tickets', (req, res) => {
  const { userId, numberOfTickets } = req.body;

  // Generate tickets
  const tickets = generateTambulaTickets(numberOfTickets);

  // Insert tickets into the database
  const sql = 'INSERT INTO tickets (userId, ticketId, ticketData) VALUES (?, ?, ?)';
  tickets.forEach((ticket) => {
    connection.query(sql, [userId, ticket.ticketId, JSON.stringify(ticket)], (error, results) => {
      if (error) {
        console.error(error);
      }
    });
  });

  res.json({ message: 'Tickets created successfully' });
});

// Fetch tickets endpoint with pagination
router.get('/tickets/:userId', (req, res) => {
  const { userId } = req.params;
  const { page, limit } = req.query;
  const offset = (page - 1) * limit;

  // Fetch tickets from the database
  const sql = 'SELECT * FROM tickets WHERE userId = ? LIMIT 10 OFFSET 0';
  connection.query(sql, [userId, limit, offset], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch tickets' });
    } else {
      res.json({ tickets: results });
    }
  });
});

module.exports = router;
