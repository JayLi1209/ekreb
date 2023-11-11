import Timer from '../Components/Timer';
import Guess from '../Components/Guess';
import '../CSS/Game.css';

function Game() {
    return (
        <div className='Game'>
            <Timer />
            <Guess />
        </div>
    )
}

export default Game