import { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import '../CSS/Game.css';

function Guess() {
    const winsRef = useRef(0);
    const lossesRef = useRef(0);

    const [input, setInput] = useState("");
    const [incorrect, setIncorrect] = useState(false);
    const [backend, setBackend] = useState([{}]);
    const [dictionaryData, setDictionaryData] = useState("");
    const [opened, toggle] = useState(false);
    const [stupid, toggleStupid] = useState(false);


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
                    setDictionaryData(null);
                    toggle(false);
                    toggleStupid(false);
                    setBackend(tmpData?.data);
                } else {
                    lossesRef.current += 1;
                    setIncorrect(true);
                }
                setInput('');
            } else {
                // Handle errors, e.g., show an error message
                console.error('Failed to send data to the server');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const displayWord = () => {
        toggleStupid(true);
    }

    const handleSearchAndDisplay = async () => {
        try {
            // Make an API request to the backend to fetch dictionary data
            const response = await axios.get(`/api/searchWord/${backend.actual}`);

            if (response?.data === "Woohoo!") {
                setDictionaryData("Ah...this word is too hard to give a hint.");
            } else {
                const meaning = response?.data[0]?.meanings[0]?.definitions[0].definition;
                setDictionaryData(meaning);
            }

        } catch (error) {
            setDictionaryData("Oops...this word is too hard to give a hint.");
            console.error('Error searching word:', error);
        }
        toggle(!opened);
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    return (
        <div className='Guess'>
            <h3>{backend.guess}</h3>

            <div className='flex-row win-lose'>
                <div>Wins: {winsRef.current} </div>
                <div>Losses: {lossesRef.current}</div>
            </div>
            <div className='col-gap'>
                <form onSubmit={handleSubmit} className='col-gap' >
                    <input
                        type="text"
                        placeholder="Take a Guess..."
                        value={input}
                        onChange={handleInputChange}
                    />
                    <button type="submit">Submit</button>
                </form>
                {
                    opened ?
                        <button onClick={handleSearchAndDisplay}>Hide Hint</button> :
                        <button onClick={handleSearchAndDisplay}>Hint</button>
                }

            </div>

            {
                dictionaryData && opened && (
                    <div className='hint flex-col'>
                        <h4>Hint from Dictionary</h4>
                        <p>{JSON.stringify(dictionaryData, null, 2)}</p>
                        <button onClick={displayWord}>I'm stupid</button>
                    </div>
                )
            }


            {
                stupid && <div>
                    Alright. The word is {backend.actual}.
                </div>
            }

            {
                incorrect && <div>
                    Incorrect, please try again!
                </div>
            }

            <div className='restart-end'>
                <Link to="../home"><button>Restart</button></Link>
                <Link to={{
                    pathname: "/stats",
                }} state={{
                    wins: winsRef.current,
                    losses: lossesRef.current
                }}><button>End Game</button></Link>
            </div>
        </div>
    )
}

export default Guess;