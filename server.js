const express = require('express');
const app = express();
const cors = require('cors');

// Use CORS to allow requests from frontend
app.use(cors());

// In-memory store for emails (temporary for demonstration)
const emailStore = {};  // Store emails by alias

// Middleware to parse JSON bodies
app.use(express.json());

// API to generate a temporary email alias
app.get('/generate', (req, res) => {
  const alias = `temp${Math.floor(Math.random() * 1000000)}@tempmail.com`;
  emailStore[alias] = [];  // Initialize empty inbox for this alias
  res.json({ alias });
});

// API to fetch emails for a given alias
app.get('/emails/:alias', (req, res) => {
  const alias = req.params.alias;
  if (emailStore[alias]) {
    res.json({ emails: emailStore[alias] });
  } else {
    res.status(404).json({ error: 'Alias not found' });
  }
});

// Simulate receiving an email (you can manually send an email here for testing)
app.post('/receive-email/:alias', (req, res) => {
  const alias = req.params.alias;
  const { subject, body } = req.body;

  if (emailStore[alias]) {
    const newEmail = { subject, body };
    emailStore[alias].push(newEmail);
    res.status(200).json({ message: 'Email received' });
  } else {
    res.status(404).json({ error: 'Alias not found' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
