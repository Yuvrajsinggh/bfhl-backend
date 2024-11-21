const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Enable CORS for all origins (or specify your frontend origin)
app.use(cors({
    origin: 'http://localhost:3000' // Replace with your frontend URL
}));

app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;

app.post('/bfhl', (req, res) => {
    try {
        const { data, file_b64 } = req.body;

        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input format" });
        }

        // Process and respond
        res.status(200).json({
            is_success: true,
            user_id: "your_name_ddmmyyyy",
            numbers: [1, 2, 3],
            alphabets: ["a", "b", "c"],
            highest_lowercase_alphabet: ["c"],
            is_prime_found: true,
            file_valid: true
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ is_success: false, message: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
