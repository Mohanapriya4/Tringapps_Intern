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

app.post('/add_user', (req, res) => {
    const { username, email, phoneNumber, city } = req.body;
    const sql = "INSERT INTO details (username, email, phoneNumber, city) VALUES (?, ?, ?, ?)";
    const values = [username, email, phoneNumber, city ];
    
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ success: false, error: err.message });
      }
      console.log('Inserted successfully:', result);
      return res.json({ success: true, result });
    });
  });
  

app.get('/users', (req, res) => {
  const sql = "SELECT * FROM details";
  db.query(sql, (err, rows) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ success: false, error: err.message });
    }
    return res.status(200).json(rows);
  });
});


const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
