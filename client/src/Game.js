import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

function Game() {
    const [backend, setBackend] = useState([{}]);

    useEffect(() => {
        axios.get('/api')
            .then((response) => {
                // console.log(response.data);
                setBackend(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <p>{backend.word}</p>
        </div>
    )
}

export default Game