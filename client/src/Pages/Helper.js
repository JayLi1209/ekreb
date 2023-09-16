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


module.exports = {
    scrambleString,
};
