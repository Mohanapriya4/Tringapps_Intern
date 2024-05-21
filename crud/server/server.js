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
  const { username, email, phoneNumber, city } = req.body;
  const sql = 'INSERT INTO details (username, email, phoneNumber, city) VALUES (?, ?, ?, ?)';
  db.query(sql, [username, email, phoneNumber, city], (err, result) => {
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
  const { username, email, phoneNumber, city } = req.body;
  const sql = 'UPDATE details SET username = ?, email = ?, phoneNumber = ?, city = ? WHERE userId = ?';
  db.query(sql, [username, email, phoneNumber, city, id], (err, result) => {
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

const port = 8081;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
