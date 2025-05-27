const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const pg = require('pg');
const helmet = require('helmet');
const env = require('dotenv');
const bcrypt = require('bcrypt');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const session = require('express-session');

env.config();

const app = express();
const port = 3001;
const saltRounds = 10;

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  }
}));

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Database connection error', err.stack));

// Passport local strategy for login
passport.use(new Strategy({}, async (username, password, cb) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE user_name = $1", [username]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPass = user.password;
      bcrypt.compare(password, storedPass, (err, isMatch) => {
        if (err) return cb(err);
        if (isMatch) {
          return cb(null, user);
        } else {
          return cb(null, false, { message: 'Incorrect password.' });
        }
      });
    } else {
      return cb(null, false, { message: 'User not registered.' });
    }
  } catch (err) {
    return cb(err);
  }
}));

// Serialize user for session management
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, cb) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length > 0) {
      cb(null, result.rows[0]);
    } else {
      cb(null, false);
    }
  } catch (err) {
    cb(err);
  }
});

// Login endpoint
app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Error during authentication', err.stack);
      return res.status(500).json({ message: 'Server Error' });
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    req.login(user, (err) => {
      if (err) {
        console.error('Error during login', err.stack);
        return res.status(500).json({ message: 'Server Error' });
      }
      return res.status(200).json(user);
    });
  })(req, res, next);
});

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const checkUser = await db.query('SELECT * FROM users WHERE user_name = $1', [username]);
    if (checkUser.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) return res.status(500).json({ message: 'Server Error' });

        const result = await db.query('INSERT INTO users (user_name, password) VALUES ($1, $2) RETURNING *', [username, hash]);
        const user = result.rows[0];

        req.login(user, (err) => {
          if (err) {
            console.error('Error during login', err.stack);
            return res.status(500).json({ message: 'Server Error' });
          }
          return res.status(200).json(user);
        });
      });
    }
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Server Error');
  }
});

// endpoint to get netstat data
app.get('/api/netstat', (req, res) => {
  const command = 'netstat -e';

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (stderr) {
      return res.status(500).json({ error: stderr });
    }

    const lines = stdout.trim().split(/\r?\n/);
    let bytesReceived = 0;
    let bytesSent = 0;

    for (let line of lines) {
      if (line.toLowerCase().includes('bytes')) {
        const columns = line.trim().split(/\s+/);
        if (columns.length >= 3) {
          bytesReceived = parseInt(columns[1], 10);
          bytesSent = parseInt(columns[2], 10);
          break;
        }
      }
    }

    const totalBytes = bytesReceived + bytesSent;
    const totalGB = totalBytes / (1024 * 1024 * 1024);

    res.json({
      bytesReceived,
      bytesSent,
      totalGB: totalGB.toFixed(2),
    });
  });
});
// Endpoint to add or update carbon footprint data
app.post('/api/carbon-footprint', async (req, res) => {
  const { userId, date, totalFootprint } = req.body;

  try {
    const result = await db.query(
      'SELECT * FROM user_footprint WHERE user_id = $1 AND date = $2',
      [userId, date]
    );

    if (result.rows.length > 0) {
      await db.query(
        'UPDATE user_footprint SET total_footprint = total_footprint + $1 WHERE user_id = $2 AND date = $3',
        [totalFootprint, userId, date]
      );
      res.json({ message: 'Carbon footprint updated for the existing date.' });
    } else {
      // If no record exists, insert a new record
      await db.query(
        'INSERT INTO user_footprint (user_id, date, total_footprint) VALUES ($1, $2, $3)',
        [userId, date, totalFootprint]
      );
      res.json({ message: 'Carbon footprint added for a new date.' });
    }
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).json({ error: 'Server error' });
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
