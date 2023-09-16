const express = require("express");
const axios = require('axios');
const bodyParser = require('body-parser');
const Helper = require("../client/src/Pages/Helper");

const app = express();
const PORT = 5001;

// ******** TODO - this should not be a let variable. ********
let actual = "";

app.use(bodyParser.json());

app.get("/api", async (req, res) => {
    try {
        const response = await axios.get("https://random-word-api.herokuapp.com/word");
        actual = response.data[0];
        const guess = Helper.scrambleString(actual);
        res.json({ actual, guess });
    } catch (error) {
        console.error("Error fetching word with error: ", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to handle incoming data
app.post('/api/submit', (req, res) => {
    const word = req.body.input;
    // Process the data and send a response if needed
    console.log(actual, word);
    if (actual.toLowerCase() === word.toLowerCase()) {
        res.json({ message: "Right" });
    } else {
        res.json({ message: "Wrong" });
    }
});


app.listen(PORT, () => { console.log("Server listening on port " + PORT) });