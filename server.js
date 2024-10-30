const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3019;

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
// Connect to MongoDB without deprecated options
mongoose.connect('mongodb://127.0.0.1:27017/students')
  .then(() => console.log('MongoDB connection successful'))
  .catch(err => console.error('MongoDB connection error:', err));

const db = mongoose.connection;
db.once('open', () => {
  console.log('MongoDB connection successful');
});

// Define the schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const Users = mongoose.model('data', userSchema);

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/post', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new Users({
      username,
      password,
    });
    await user.save();
    console.log(user);
    res.send('Form Submission Successful');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred during form submission');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

