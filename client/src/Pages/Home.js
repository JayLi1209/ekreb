import { Link } from "react-router-dom";
import Ghost from "../images/ghost.png"



function Home() {

    return (
        <div className='App'>
            <h1>
                Welcome to Ekreb!
            </h1>
            <img src={Ghost} alt="" />
            <p>A ghost scrambled you words...you have to reconstruct it!</p>
            <Link to="/game"><button> Start game </button></Link>
        </div>
    )
}

export default Home;