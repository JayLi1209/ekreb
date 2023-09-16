import { useEffect, useState } from 'react';
import axios from 'axios';
import Timer from './Timer';
import Guess from './Guess';

function Game() {
    const [backend, setBackend] = useState([{}]);

    useEffect(() => {
        axios.get('/api')
            .then((response) => {
                console.log(response);
                setBackend(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);


    return (
        <div>
            <Timer />
            <p>{backend.guess}</p>
            <p>{backend.actual}</p>
            <Guess />
        </div>
    )
}

export default Game