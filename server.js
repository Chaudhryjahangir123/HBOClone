const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3019;
const app = express();

// Middleware
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String
}, { timestamps: true });

// Model
const Users = mongoose.model('data', userSchema);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/user', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Test route to confirm server is running
app.get('/test', (req, res) => {
    res.json({ message: 'Server is running!' });
});

// Route to show login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Route to save user data
app.post('/post', async (req, res) => {
    try {
        console.log('Received data:', req.body);  // Log received data
        
        const { username, password } = req.body;
        const user = new Users({ username, password });
        
        await user.save();
        console.log('Saved user:', user);  // Log saved user
        
        res.json({ 
            message: 'User saved successfully',
            user: user
        });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ error: error.message });
    }
});

// Route to check saved users
app.get('/check-users', async (req, res) => {
    try {
        const users = await Users.find({});
        res.json({ users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});



