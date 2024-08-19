const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const secretKey = 'mysecretkey';

app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ankita#@2101',
  database: 'hotel_inventory'
});

connection.connect((err) => {
  if (err) {
    console.log('Error connecting to DB: ', err);
  }
});

// Endpoint to login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = ?`;
  connection.query(query, [username], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('User not found');

    const user = results[0];
    
    // Debugging
    //console.log('Stored Password Hash:', user.password);
    //console.log('Entered Password:', password);

    if (bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: 86400 });
      res.json({ auth: true, token, username: user.username, role: user.role });
    } else {
      res.status(401).json({ auth: false, token: null });
    }
  });
});


// Endpoint for new user to register
app.post('/api/register', (req, res) => {
  const { username, password, confirmPassword, role, salary } = req.body;

  // find if the user already exists
  const query_find = `SELECT * FROM users WHERE username = ?`;
  connection.query(query_find, [username], (err, results) => {
    if (results.length > 0) return res.status(409).send('User already exists');
    else{
      const hashedPassword = bcrypt.hashSync(password, 8); // Hash the password
      const query = `INSERT INTO users (username, password, role, salary) VALUES (?, ?, ?, ?)`;

      connection.query(query, [username, hashedPassword, role, salary], (err, result) => {
        if (err) return res.status(500).send(err);

        const userId = result.insertId;
        const token = jwt.sign({ id: userId }, secretKey, { expiresIn: 86400 });
        res.status(201).json({ auth: true, token });
      });
    }
  });
});

// Endpoint to get the list of users
app.get('/api/users', (req, res) => {
  const query = `SELECT * FROM users`;
  connection.query(query, (err, result) => {
    if (err) return res.send(err);
    return res.json(result);
  });
});

// Endpoint to add a new user
app.post('/api/users', (req, res) => {
  const { username, role, password, salary } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8); // Hash the password
  const query = `INSERT INTO users (username, password, role, salary) VALUES (?, ?, ?, ?)`;
  connection.query(query, [username, hashedPassword, role, salary], (err, result) => {
    if (err) return res.send(err);
    return res.json(result);
  });
});

// Endpoint to delete a user by ID
app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const query = `DELETE FROM users WHERE id = ?`;
  connection.query(query, [userId], (err, result) => {
    if (err) return res.send(err);
    return res.json(result);
  });
});

app.patch('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const { status } = req.body;
  console.log('Status:', status);

  // Make sure the status and userId are properly sanitized and valid
  const query = 'UPDATE users SET Status = ? WHERE id = ?';
  connection.query(query, [status, userId], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send(err); // Respond with an error status
    }
    res.status(200).json({ message: 'Status updated successfully', result });
  });
});

// Endpoint to update a user by ID
app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const { username, role, salary } = req.body;
  const query = `UPDATE users SET username = ?, role = ?, salary = ? WHERE id = ?`;
  connection.query(query, [username, role, salary, userId], (err, result) => {
    if (err) return res.send(err);
    return res.json(result);
  });
});

// Endpoint to get rooms
app.get('/api/rooms', (req, res) => {
  const query = `SELECT * FROM rooms`;
  connection.query(query, (err, result) => {
    if (err) return res.error(err);
    return res.json(result);
  });
});

// guest registers
app.post('/api/signup', (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  const query_find = `SELECT * FROM guests WHERE email = ?`;
  connection.query(query_find, [email], (err, results) => {
    if(results.length > 0) {
      return res.status(409).send('User with this email already exists');
    }
    else if(err)  return res.status(500).send(err.message);
    else{
      const hashedPassword = bcrypt.hashSync(password, 8);
      const query = `INSERT INTO guests (first_name, last_name, email, phone_number, password) VALUES (?, ?, ?, ?, ?)`;

      connection.query(query, [firstName, lastName, email, phoneNumber, hashedPassword], (err, result) => {
          if (err) return res.status(500).json({ message: 'here Database error' });

          const guestId = result.insertId;
          const token = jwt.sign({ id: guestId }, secretKey, { expiresIn: 86400 });

          res.status(201).json({ auth: true, token });
      });
    }
  });
});

// endpoint to get guest wishlists
app.get('/api/wishlist/:guestId', (req, res) => {
  const query = `SELECT * FROM wishlist WHERE guest_id =?`;
  connection.query(query, [guestId], (err, result) => {
    if (err) return res.send(err.sqlMessage);
    return res.status(200).json(result);
  });
});

//endpoint to add room to wishlist
app.post('/api/wishlist', (req, res) => {
  const { guestId, roomId } = req.body;

  if (!guestId || !roomId) {
    return res.status(400).json({ message: 'Guest ID and Room ID are required' });
  }

  const query = `INSERT INTO wishlist (guest_id, room_id) VALUES (?, ?)`;
  connection.query(query, [guestId, roomId], (err, result) => {
    if (err) return res.status(500).send(err.sqlMessage);
    res.status(201).json({ message: 'Room added to wishlist', wishlistId: result.insertId });
  });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
