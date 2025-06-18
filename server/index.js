// Load environment variables first
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const boardRoutes = require('./src/routes/boardRoutes');
const kudosRoutes = require('./src/routes/kudosRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/boards', boardRoutes);
app.use('/api/kudos', kudosRoutes);

app.get('/', (req, res) => {
  res.send('Kudos Board API is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
