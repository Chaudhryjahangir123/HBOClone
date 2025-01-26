import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB connection string
let db;

// Get the directory name using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.static(__dirname)); // Serve static files from the current directory
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
MongoClient.connect(uri)
    .then(client => {
        console.log('Connected to Database');
        db = client.db('hbo_clone'); // Replace with your actual database name
    })
    .catch(error => console.error(error));

// Handle the form submission (without hashing password)
app.post('/post', (req, res) => {
    const { username, password } = req.body;
    console.log('Received data:', { username, password });

    // Store the password as it is (no hashing)
    db.collection('users').insertOne({ username, password })
        .then(result => {
            console.log('User added:', result);
            res.redirect('/home');
        })
        .catch(error => {
            console.error(error);
            res.status(500).send("Error saving data to database.");
        });
});

// Serve login.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Serve home.html
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html')); // Ensure you have a home.html
});

// FAQ data
const faqs = [
    { id: 1, question: "How do I reset my password?", answer: "To reset your password, go to the 'Forgot Password' page and follow the instructions." },
    { id: 2, question: "How can I cancel my subscription?", answer: "To cancel your subscription, visit your account settings and click on 'Cancel Subscription'." },
    { id: 3, question: "How do I update my payment method?", answer: "You can update your payment method from your account billing settings." }
];

// FAQ API route
app.get('/api/faqs', (req, res) => {
    res.json(faqs); // Sends the FAQ data as JSON
});

// Server listening
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
