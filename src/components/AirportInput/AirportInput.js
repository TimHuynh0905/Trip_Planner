import React, { useState, useRef, useEffect } from 'react';

import './AirportInput.scss';

import FormInput from '../UI/FormInput/FormInput';

const AirportInput = ({ label, name }) => {
    const node = useRef();

    const [ airport, setAirport ] = useState('');
    const [ toggleOn, setToggle ] = useState(false)
    const [ touched, setTouched ] = useState(false)

    const handleClick = (event) => {
        if (!node.current.contains(event.target)) {
            setToggle(false);
        }
    }

    useEffect(() => {
        // add when mounted
        document.addEventListener('mousedown', handleClick);
        // return function to be called when unmounted
        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, []);

    const airports = [
        {
            PlaceId: "STOC-sky",
            PlaceName: "Stockholm",
            CountryId: "SE-sky",
            RegionId: "",
            CityId: "STOC-sky",
            CountryName: "Sweden",
        },
        {
            PlaceId: "ARN-sky",
            PlaceName: "Stockholm Arlanda",
            CountryId: "SE-sky",
            RegionId: "",
            CityId: "STOC-sky",
            CountryName: "Sweden",
        },
        {
            PlaceId: "NYO-sky",
            PlaceName: "Stockholm Skavsta",
            CountryId: "SE-sky",
            RegionId: "",
            CityId: "STOC-sky",
            CountryName: "Sweden",
        },
        {
            PlaceId: "VST-sky",
            PlaceName: "Stockholm Vasteras",
            CountryId: "SE-sky",
            RegionId: "",
            CityId: "STOC-sky",
            CountryName: "Sweden",
        },
        {
            PlaceId: "BMA-sky",
            PlaceName: "Stockholm Bromma",
            CountryId: "SE-sky",
            RegionId: "",
            CityId: "STOC-sky",
            CountryName: "Sweden",
        }
    ]

    return (
        <div className='airport-input' ref={ node }>
            <FormInput
                label={ label }
                name={ name }
                type='text'
                value={ airport }
                handleChange={ (event) => setAirport(event.target.value) }
                onClick={ () => {
                    setToggle(!toggleOn);
                    setTouched(true);
                } }
                touched={ touched }
                toggleOn={ toggleOn }
                required
            />
            {
                toggleOn &&
                    <div className='dropdown-box'>
                        {
                            airports.map((airport, idx) => 
                                (
                                    <div 
                                        key={idx} 
                                        className='airport'
                                        onClick={ () => {
                                            setAirport(`${ airport.PlaceId.split('-')[0] } - ${ airport.PlaceName }`);
                                            setToggle(false);
                                        }}>
                                            <h6>{ airport.PlaceId.split('-')[0] } - { airport.PlaceName }</h6>
                                    </div>
                                )
                            )
                        }
                    </div>
            }
        </div>
    );
}

export default AirportInput;