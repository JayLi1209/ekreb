const express = require("express");
const axios = require('axios');

const app = express();
const PORT = 5001;


app.get("/api", async (req, res) => {
    try {
        const response = await axios.get("https://random-word-api.herokuapp.com/word");
        const word = response.data[0];
        // console.log(word);
        res.json({ word });
    } catch (error) {
        console.error("Error fetching word with error: ", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


app.listen(PORT, () => { console.log("Server listening on port " + PORT) });