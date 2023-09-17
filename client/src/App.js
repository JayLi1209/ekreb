import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './Pages/Home';
import Game from './Pages/Game';
import Stats from './Pages/Stats';
import './CSS/App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
