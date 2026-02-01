const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));
// 1. Middleware to handle form data
app.use(express.static(path.join(__dirname, '../')));

app.get('/help', (req, res) => {
    res.sendFile(path.join(__dirname, '../help.html'));
});

// 2. Connect to MongoDB (Replace 'RUIX_DB' with your desired database name)
mongoose.connect('mongodb://localhost:27017/RUIXDb')
    .then(() => console.log("Connected to MongoDB successfully!"))
    .catch(err => console.error("Could not connect to MongoDB", err));

// 3. Define a Schema and Model for your Help Form
const helpSchema = new mongoose.Schema({
    name: String,
    email: String,
    issue: String,
    date: { type: Date, default: Date.now },
    timestamp: { type: Date, default: Date.now }
},{ timestamps: true });

const HelpRequest = mongoose.model('HelpRequest', helpSchema);

// 4. Route to handle form submission
app.post('/submit-help', async (req, res) => {
    try {
        const newRequest = new HelpRequest({
            name: req.body.name,
            email: req.body.email,
            issue: req.body.issue
        });

        await newRequest.save();
        // Redirect back to home or show success message
        res.send("<h1>Thank you! Your issue has been recorded.</h1><a href='/'>Go Back</a>");
    } catch (error) {
        res.status(500).send("There was an error saving your data.");
    }
});

// 5. Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});