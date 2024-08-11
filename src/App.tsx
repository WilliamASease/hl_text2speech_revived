import { useEffect } from 'react';
import './App.css';
import sndMap from './sndMap.json'

function App() {

  useEffect(() => {
    fetch("williamasease.github.io/"+sndMap.male['a.wav'])
  })
  
  return (
    <div className="App">
      APP
    </div>
  );
}

export default App;
