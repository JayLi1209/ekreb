import React, { useState, useEffect } from 'react';

function Timer() {
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <p>Elapsed Time: {timer} seconds</p>
        </div>
    );
}

export default Timer