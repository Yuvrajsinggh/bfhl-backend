import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { validateInput, processData, validateFile } from './utils.js';

dotenv.config();
const app = express();
app.use(bodyParser.json());

const corsOptions = {
    origin: 'https://bfhl-frontend-pi-drab.vercel.app/',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  };

const PORT = process.env.PORT || 3001;

// Routes
app.post('/bfhl', (req, res) => {
    try {
        const { data, file_b64 } = req.body;

        // Validate input
        if (!validateInput(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input format" });
        }

        // Process data
        const processedData = processData(data);

        // Validate file
        const fileValidation = validateFile(file_b64);

        // Construct response
        res.status(200).json({
            is_success: true,
            user_id: "yuvraj_singh_21042003",
            email: "yuvrajsingh210233@acropolis.in",
            roll_number: "0827CS211272",
            ...processedData,
            ...fileValidation,
        });
    } catch (err) {
        console.error('Error processing POST /bfhl:', err);
        res.status(500).json({ is_success: false, message: "Internal Server Error" });
    }
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
