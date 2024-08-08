import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    // Fetch the list of sound files from the server
    fetch('williamasease.github.io/hl_text2speech_revived/snd')
      .then((response) => response.json())
      .then((data) => console.info(data))
      .catch((error) => console.error('Error fetching sound files:', error));
  }, []);
  
  return (
    <div className="App">
      APP
    </div>
  );
}

export default App;
