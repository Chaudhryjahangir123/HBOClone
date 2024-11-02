const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const app = express();
const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB connection string
let db;

// Middleware
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
MongoClient.connect(uri)
    .then(client => {
        console.log('Connected to Database');
        db = client.db('hbo_clone'); // Replace with your actual database name
    })
    .catch(error => console.error(error));

// Handle the form submission
app.post('/post', (req, res) => {
    const { username, password } = req.body;
    console.log('Received data:', { username, password });

    // Store login data in MongoDB
    db.collection('users').insertOne({ username, password })
        .then(result => {
            console.log('User added:', result);
            res.redirect('/home'); // Redirect to home.html
        })
        .catch(error => {
            console.error(error);
            res.status(500).send("Error saving data to database.");
        });
});

// Serve login.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

// Serve home.html
app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/home.html'); // Ensure you have a home.html
});

// Server listening
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
