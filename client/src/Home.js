
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';


function Home() {

    return (

        <div className='App'>
            <h1>
                Welcome to Ekreb!
            </h1>
            <Link to="/game"><button> Start game </button></Link>
            {/* <p>{backend.word}</p> */}
        </div>
    )
}

export default Home;