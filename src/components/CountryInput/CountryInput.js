import React, { useState, useRef, useEffect } from 'react';

import './CountryInput.scss';

import FormInput from '../UI/FormInput/FormInput';

const CountryInput = ({ label, name }) => {
    const node = useRef();

    const [ country, setCountry ] = useState('');
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

    const countries = [
        {
            Code: "AD",
            Name: "Andorra"
        },
        {
            Code: "AE",
            Name: "United Arab Emirates"
        },
        {
            Code: "AF",
            Name: "Afghanistan"
        },
        {
            Code: "AG",
            Name: "Antigua and Barbuda"
        },
        {
            Code: "AI",
            Name: "Anguilla"
        },
        {
            Code: "AE",
            Name: "United Arab Emirates"
        },
        {
            Code: "AF",
            Name: "Afghanistan"
        },
        {
            Code: "AG",
            Name: "Antigua and Barbuda"
        },
        {
            Code: "AI",
            Name: "Anguilla"
        }
    ]

    return (
        <div className='country-input' ref={ node }>
            <FormInput
                label={ label }
                name={ name }
                type='text'
                value={ country }
                handleChange={ (event) => setCountry(event.target.value) }
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
                            countries.map((country, idx) => 
                                (
                                    <div 
                                        key={idx} 
                                        className='country'
                                        onClick={ () => {
                                            setCountry(`${ country.Code } - ${ country.Name }`);
                                            setToggle(false);
                                        }}>
                                            <h6>{ country.Code } - { country.Name }</h6>
                                    </div>
                                )
                            )
                        }
                    </div>
            }
        </div>
    );
}

export default CountryInput;