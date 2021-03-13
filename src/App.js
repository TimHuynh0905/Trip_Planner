import React, { useState, useEffect } from 'react';
import { axios_instance, endpoints } from './config';
import axios from 'axios';

import './App.scss';

import Particles from 'react-particles-js';
import Navbar from './containers/Navbar/Navbar';
import Browse from './containers/Browse/Browse';
import Results from './containers/Results/Results';

const App = () => {

  const [ currencies, setCurrencies ] = useState([]);
  const [ countries, setCountries ] = useState([]);
  const [ routes, setRoutes ] = useState(null);

  useEffect(() => {
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
      <div id='container'>
        <Navbar/>
        <div id='content'>
          <Browse
            countries={ countries }
            currencies={ currencies }
            setRoutes={ setRoutes }/>
          {
            routes &&
            <>
                <hr/>
                <Results
                  routes={ routes }/>
            </>
          }
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
