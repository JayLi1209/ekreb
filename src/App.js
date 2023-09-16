import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';


function App() {
  const [state, setState] = useState(null);

  async function getWord() {
    const word = await axios.get("https://random-word-api.herokuapp.com/word");
    // console.log(word.data[0]);
    return word.data[0]
  }



  return (
    <div>
      <button >Click me!</button>
    </div>

  )

}

export default App;
