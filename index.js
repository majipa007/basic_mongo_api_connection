import express from 'express';
import mongoose from 'mongoose';
import User from './user.model.js'; // Importing the User model
import bcrypt from 'bcrypt'; // For password hashing
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Frontend origin
    credentials: true,              // Allow credentials
}));

app.listen(3000, () => {
    console.log('Server is running on localhost:3000');
});

// Connecting with the database
const con = "mongodb://root:password@localhost:27017/";
mongoose.connect(con)
    .then(() => console.log('Connected!'))
    .catch(() => console.log("Connection not established"));

// Basic GET request
app.get('/', async (req, res) => {
    res.send('Hello World');
});


// Endpoint for user registration
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.create({ name, email, password });
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
