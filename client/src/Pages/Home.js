import { Link } from "react-router-dom";



function Home() {

    return (

        <div className='App'>
            <h1>
                Welcome to Ekreb!
            </h1>
            <Link to="/game"><button> Start game </button></Link>
        </div>
    )
}

export default Home;