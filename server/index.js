const express = require('express');
const bodyParser = require('body-parser');
const { db } = require('./db'); // Import database connection
const app = express();

const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// GET customers
app.get('/api/customers', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM customers');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET restaurants
app.get('/api/restaurants', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM restaurants');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST reservation
app.post('/api/customers/:id/reservations', async (req, res) => {
    try {
        const { restaurant_id, date, party_count } = req.body;
        const customerId = req.params.id;

        if (!restaurant_id || !date || !party_count) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const query = `
            INSERT INTO reservations (customer_id, restaurant_id, date, party_count)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [customerId, restaurant_id, date, party_count];
        const result = await db.query(query, values);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create reservation' });
    }
});

// Server start
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
