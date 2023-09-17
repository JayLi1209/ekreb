import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import React from 'react';



function Stats() {
    const { wins, losses } = useLocation().state;

    return (
        <div>
            <h2>Game Stats</h2>
            <p>Wins: {wins}</p>
            <p>Losses: {losses}</p>
            <Link to="../home"><button>Restart</button></Link>
        </div>
    );
}







export default Stats;