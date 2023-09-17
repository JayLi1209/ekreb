import { useLocation } from 'react-router-dom';
import React from 'react';



function Stats() {
    const location = useLocation();

    console.log(location);

    return (
        <div>
            <h2>Game Stats</h2>
            {/* <p>Wins: {wins}</p>
            <p>Losses: {losses}</p> */}
        </div>
    );
}







export default Stats;