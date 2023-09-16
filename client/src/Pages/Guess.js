import { useState } from 'react';
import { Link } from "react-router-dom";

function Guess() {
    const [input, setInput] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input }),
            });

            if (response.ok) {
                // Handle success
                const data = await response.json();
                console.log('Response from server:', data);
                // Clear the input field
                setInput('');
            } else {
                // Handle errors, e.g., show an error message
                console.error('Failed to send data to the server');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Type something and press Enter..."
                    value={input}
                    onChange={handleInputChange}
                />
                <button type="submit">Submit</button>
            </form>
            <Link to="../home"><button>Home</button></Link>
        </div>
    )
}

export default Guess;