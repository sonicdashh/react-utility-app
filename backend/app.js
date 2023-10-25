const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const taskRoutes = require('./routes/taskRoutes');

const app = express();



app.use(bodyParser.json());
app.use(cors());

// Use MONGODB_URI from process.env if it exists, otherwise use a default URL
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/react-utility-app';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log("hi1");
const db = mongoose.connection;
console.log("hi");
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/', taskRoutes);
console.log("hi23");
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
