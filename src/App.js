import React, { useState, useEffect } from 'react';
import { axios_instance, endpoints } from './config';
import axios from 'axios';

import Particles from 'react-particles-js';
import Browse from './containers/Browse/Browse';
import Results from './containers/Results/Results';
import './App.scss';

const App = () => {

  // Application-level states shared across all components
  // Redux or Context API might be better solutions for bigger apps
  const [ currencies, setCurrencies ] = useState([]);
  const [ countries, setCountries ] = useState([]);
  const [ routes, setRoutes ] = useState(null);

  useEffect(() => {
    // Countries and Currencies are static 
    // Fetch them all at once on cold start

    axios.all([
      axios_instance.get(endpoints.countries),
      axios_instance.get(endpoints.currencies)
    ])
      .then(axios.spread((countriesRes, currenciesRes) => {
        console.log(countriesRes);
        console.log(currenciesRes);

        const countries = countriesRes.data.Countries;
        const currencies = currenciesRes.data.Currencies;

        setCountries(countries);
        setCurrencies(currencies);
      }))
      .catch(err => console.error(err));

  }, []);

  return (
    <div className="App">
      {/* Wrapper - Application logic goes in here */}
      <div id='wrapper'>

        {/* Main content - Solution  */}
        <div id='main'>
          <div className='content'>

            {/* Browse box - Search inputs */}
            <Browse
              countries={ countries }
              currencies={ currencies }
              setRoutes={ setRoutes }/>
            
            {/* Results box - Search outputs */}
            {
              // if and only if routes are found (routes != null)
              routes &&
              <>
                  <hr/>
                  <Results
                    routes={ routes }/>
              </>
            }
          
          </div>
        </div>

        {/* Footer - Copyright - LinkedIn*/}
        <div id='footer'>
          <ul className='copyright'>
							<li>
                Copyright &copy; 
                <a 
                  rel='noopener noreferrer' 
                  target='_blank'
                  href="https://www.linkedin.com/in/qthuynh9501/">
                    quoc
                </a>{' '} 
                2021
              </li>
						</ul>
        </div>
      </div>

      {/* Particles.js used as background */}
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
