import React from 'react';

import './App.scss';

import Particles from 'react-particles-js';
import Navbar from './containers/Navbar/Navbar';
import Browse from './containers/Browse/Browse';
import Results from './containers/Results/Results';

const App = () => {
  return (
    <div className="App">
      <div id='container'>
        <Navbar/>
        <div id='content'>
          <Browse/>
          <hr/>
          <Results/>
        </div>
      </div>
      <Particles
        id='particles-js'
        params={{ 
          particles: { 
            number: { 
              value: 300, 
              density: { 
                enable: true, 
                value_area: 1000, 
              } 
            }, 
          }, 
        }} 
      /> 
    </div>
  );
}

export default App;
