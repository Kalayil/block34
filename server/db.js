const { Pool } = require('pg');

const db = new Pool({
    user: 'your_username', // Replace with your PostgreSQL username
    host: 'localhost',
    database: 'acme_reservation_planner', // Ensure this database exists
    password: 'your_password', // Replace with your password
    port: 5432,
});

db.connect()
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.error('Database connection error:', err));

module.exports = { db };
