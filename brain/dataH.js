const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../')));

// 1. SET UP MULTIPLE CONNECTIONS
// Database 1: Your existing Help database
const connHelp = mongoose.createConnection('mongodb://localhost:27017/RUIXDb');

// Database 2: Your new second database (Rename 'SIgnDb' as needed)
const connSecond = mongoose.createConnection('mongodb://localhost:27017/SIgnDb');

// 2. DEFINE SCHEMAS AND BIND TO SPECIFIC CONNECTIONS
const helpSchema = new mongoose.Schema({
    name: String,
    email: String,
    issue: String
}, { timestamps: true });

// Bind the model to connHelp specifically
const HelpRequest = connHelp.model('HelpRequest', helpSchema);

// Define Schema for the second database
const secondSchema = new mongoose.Schema({
    // Add your new database fields here
    email: String,
    password: String,
}, { timestamps: true });

// Bind the model to connSecond specifically
const SecondModel = connSecond.model('SecondEntry', secondSchema);

// 3. LOG CONNECTION STATUS
connHelp.on('connected', () => console.log("Connected to RUIXDb (DB 1) successfully!"));
connSecond.on('connected', () => console.log("Connected to SIgnDb (DB 2) successfully!"));

// 4. ROUTES
app.get('/help', (req, res) => {
    res.sendFile(path.join(__dirname, '../help.html'));
});

// Route for Database 1
app.post('/submit-help', async (req, res) => {
    try {
        const newRequest = new HelpRequest({
            name: req.body.name,
            email: req.body.email,
            issue: req.body.issue
        });
        await newRequest.save();
        res.send("<h1>Recorded in RUIXDb!</h1><a href='/help'>Go Back</a>");
    } catch (error) {
        res.status(500).send("Error saving to DB 1.");
    }
});

// Route for Database 2
app.post('/accept-sign', async (req, res) => {
    try {
        const entry = new SecondModel({
            email: req.body.email,
            password: req.body.password
        });
        await entry.save();
        res.send("<h1>Recorded in Second Database!</h1><a href='/help'>Go Back</a>");
    } catch (error) {
        res.status(500).send("Error saving to DB 2.");
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});