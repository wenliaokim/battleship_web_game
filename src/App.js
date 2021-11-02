import React from 'react';
import Particles from 'react-tsparticles';
import particles from './particles.json';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Battleship</h1>
      <Particles className="particle" options={particles}/>
    </div>
  );
};

export default App;
