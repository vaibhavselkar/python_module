const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const cors = require('cors');
const app = express();
const PORT = 4000;

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: "*"
}));

// Feedback function
function provideFeedback(writingResponse, callback) {
    // Call your Python script and pass the writing response
    const pythonProcess = spawn('python', ['python_script.py', writingResponse]);

    // Collect data from stdout
    let feedback = '';
    pythonProcess.stdout.on('data', (data) => {
        feedback += data.toString();
    });

    // Handle errors
    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
    });

    // Handle process exit
    pythonProcess.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
        // Send the collected feedback
        callback(feedback);
    });
}

// Endpoint to receive writing response and return feedback
app.post('/feedback', (req, res) => {
    const writingResponse = req.body.writing_response;
    provideFeedback(writingResponse, (feedback) => {
        res.json({ feedback });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
