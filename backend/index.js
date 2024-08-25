const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST /bfhl endpoint
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: 'Invalid input format' });
    }

    const numbers = [];
    const alphabets = [];
    const lowercaseAlphabets = [];

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (/^[a-zA-Z]+$/.test(item)) {
            alphabets.push(item);
            if (/[a-z]/.test(item)) {
                lowercaseAlphabets.push(item);
            }
        }
    });

    const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 
        ? [lowercaseAlphabets.sort().reverse()[0]] 
        : [];

    // Example user information, replace with actual user details
    const response = {
        is_success: true,
        user_id: 'somy_srivastava_27032003',
        email: 'somysrivastava273@gmail.com',
        roll_number: '21BCE0045',
        numbers:numbers,
        alphabets:alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet
    };

    res.json(response);
});

// GET /bfhl endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
