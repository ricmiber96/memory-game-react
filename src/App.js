import { useEffect, useState } from 'react';
import './App.css';
import MemoryGame from './components/MemoryGame';


function App() {

  const [score, setScore] = useState(0)
  const [options, setOptions] = useState(null)

  return (
    <div className="container">

      {/* <MemoryGame options={options} setOptions={setOptions}/> */}
      <MemoryGame />
    </div>
  );
}

export default App;
