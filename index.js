import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors'; 
import { validateInput, processData, validateFile } from './utils.js';

dotenv.config();
const app = express();
app.use(bodyParser.json());

// CORS Configuration (No trailing slash in origin)
const corsOptions = {
    origin: 'https://bfhl-frontend-eight-wine.vercel.app',  // Frontend URL (no trailing slash)
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};

// Use CORS middleware with the correct options
app.use(cors(corsOptions));

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

        // Initialize file validation object
        let fileValidation = { file_valid: false };  // Default: No file valid

        if (file_b64) {
            // Validate file if file is provided
            fileValidation = validateFile(file_b64);
        }

        // Construct response
        const response = {
            is_success: true,
            user_id: "yuvraj_singh_21042003",
            email: "yuvrajsingh210233@acropolis.in",
            roll_number: "0827CS211272",
            ...processedData,
            ...fileValidation,  // Include file validation result
        };

        // Exclude file_mime_type and file_size_kb if file is invalid
        if (!fileValidation.file_valid) {
            delete response.file_mime_type;
            delete response.file_size_kb;
        }

        res.status(200).json(response);  // Send response

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
