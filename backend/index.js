const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const forumRoutes = require('./routes/forum')

const app = express();
const port = 5000;
const cors = require('cors');


app.use(cors());
app.use(express.json());
require('dotenv').config();

// MongoDB connection URL
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;

// Event listeners for connection
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB successfully!');
  // Additional setup or start your express server here
});

// Example route
app.get('/', (req, res) => {
  res.send('Hello, MongoDB!');
});

app.use('/api', express.Router().use(authRoutes, forumRoutes));

// Export the Express app
module.exports = app;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

