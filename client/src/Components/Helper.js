const axios = require("axios");

function scrambleString(inputString) {
    // Convert the input string to an array of characters
    const charArray = inputString.split('');

    // Function to shuffle an array in place using Fisher-Yates algorithm
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
    };

    // Shuffle the array of characters
    shuffleArray(charArray);

    // Join the shuffled characters back into a string
    const scrambledString = charArray.join('');

    return scrambledString;
}


async function generateWord() {
    try {
        const response = await axios.get("https://random-word-api.herokuapp.com/word");
        return response.data[0];
    } catch (error) {
        console.error("API: Error fetching word with error: ", error);
    }
}

module.exports = {
    scrambleString,
    generateWord
};
