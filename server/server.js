const express = require("express");
const bodyParser = require('body-parser');
const Helper = require("../client/src/Pages/Helper");

const app = express();
const PORT = 5001;
let actual = "";

app.use(bodyParser.json());


app.get("/api", async (req, res) => {
    try {
        actual = await Helper.generateWord();
        const guess = Helper.scrambleString(actual);
        res.json({ actual, guess });
    } catch (error) {
        console.error("Error fetching word with error: ", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to handle incoming data
app.post('/api/submit', async (req, res) => {
    const word = req.body.input;
    // Process the data and send a response if needed
    console.log(actual, word);
    if (actual.toLowerCase() === word.toLowerCase()) {
        actual = await Helper.generateWord();
        const guess = Helper.scrambleString(actual);
        // res.json({ message: "Right", guess, actual });

        // Create a JSON object
        const responseObject = {
            message: "Right",
            data: {
                actual: actual,
                guess: guess
            }
        };

        res.json(responseObject);
    } else {
        res.json({ message: "Wrong" });
    }
});


app.listen(PORT, () => { console.log("Server listening on port " + PORT) });