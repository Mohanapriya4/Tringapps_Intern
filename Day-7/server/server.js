const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mohu@0417',
  database: 'registration_db',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Get users
app.get('/users', (req, res) => {
  const sql = "SELECT * FROM details";
  db.query(sql, (err, rows) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).send('Error fetching users');
      return;
    }
    res.send(rows);
  });
});

// Add user
app.post('/add_user', (req, res) => {
  const { username, email, phoneNumber, birthDate, gender, address, country, city, region } = req.body;
  const sql = 'INSERT INTO details (username, email, phoneNumber, birthDate, gender, address, country, city, region) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [username, email, phoneNumber, birthDate, gender, address, country, city, region], (err, result) => {
    if (err) {
      console.error('Error adding user:', err);
      res.status(500).send('Error adding user');
      return;
    }
    res.send({ message: 'User added successfully', userId: result.insertId });
  });
});

// Edit user
app.put('/edit_user/:id', (req, res) => {
  const { id } = req.params;
const { username, email, phoneNumber, birthDate, gender, address, country, city, region } = req.body;

// Convert birthDate to the correct format (YYYY-MM-DD)
const formattedBirthDate = new Date(birthDate).toISOString().split('T')[0];

const sql = 'UPDATE details SET username = ?, email = ?, phoneNumber = ?, birthDate = ?, gender = ?, address = ?, country = ?, city = ?, region = ? WHERE userId = ?';
db.query(sql, [username, email, phoneNumber, formattedBirthDate, gender, address, country, city, region, id], (err, result) => {
  if (err) {
    console.error('Error updating user:', err);
    res.status(500).send('Error updating user');
    return;
  }
  res.send({ message: 'User updated successfully' });
});

});

// Delete user
app.delete('/delete_user/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM details WHERE userId = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).send('Error deleting user');
      return;
    }
    res.send({ message: 'User deleted successfully' });
  });
});

// Delete multiple users
app.delete('/delete_users', (req, res) => {
  const { ids } = req.body; // Expecting an array of user IDs
  if (!ids || ids.length === 0) {
    res.status(400).send({ message: 'No IDs provided' });
    return;
  }
  const sql = 'DELETE FROM details WHERE userId IN (?)';
  db.query(sql, [ids], (err, result) => {
    if (err) {
      console.error('Error deleting users:', err);
      res.status(500).send('Error deleting users');
      return;
    }
    res.send({ message: 'Users deleted successfully' });
  });
});

const port = 8081;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
