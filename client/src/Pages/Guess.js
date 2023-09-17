import { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

function Guess() {
    const winsRef = useRef(0);
    const lossesRef = useRef(0);

    const [input, setInput] = useState("");
    const [incorrect, setIncorrect] = useState(false);
    const [backend, setBackend] = useState([{}]);


    useEffect(() => {
        axios.get('/api')
            .then((response) => {
                setBackend(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

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
                const responseText = await response.text();
                const tmpData = JSON.parse(responseText);


                if (tmpData?.data) {
                    setIncorrect(false);
                    winsRef.current += 1;
                    setBackend(tmpData?.data);
                } else {
                    lossesRef.current += 1;
                    setIncorrect(true);
                }
                // console.log('Response from server:', tmpData);
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
            <p>{backend.guess}</p>
            <p>{backend.actual}</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Take a Guess..."
                    value={input}
                    onChange={handleInputChange}
                />
                <button type="submit">Submit</button>
            </form>
            {
                incorrect && <div>
                    Incorrect, please try again!
                </div>
            }

            <p>Wins: {winsRef.current}</p>
            <p>Losses: {lossesRef.current}</p>
            <Link to="../home"><button>Restart</button></Link>
            <Link to={{
                pathname: "../stats",
                state: {
                    wins: winsRef.current,
                    losses: lossesRef.current,
                    row: 1
                }
            }}><button>End Game</button></Link>
        </div>
    )
}

export default Guess;