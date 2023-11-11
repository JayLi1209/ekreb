import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import React from 'react';



function Stats() {
    const { wins, losses } = useLocation().state;

    return (
        <div className='flex-col'>
            <h1>Game Stats</h1>
            <p>Wins: {wins}</p>
            <p>Losses: {losses}</p>
            {
                wins <= losses && <h3>
                    (That's a bad score...)
                </h3>
            }
            <Link to="../home"><button>Restart</button></Link>
        </div>
    );
}







export default Stats;