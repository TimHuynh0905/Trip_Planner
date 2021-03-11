import React, { useState } from 'react';

import './CountryInput.scss';

import FormInput from '../UI/FormInput/FormInput';

const CountryInput = ({ label, name }) => {
    const [ country, setCountry ] = useState('');

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
        <div className='country-input'>
            <FormInput
                label={ label }
                name={ name }
                type='text'
                value={ country }
                handleChange={ (event) => setCountry(event.target.value) }
                required
            />
            {
                country.length > 0 &&
                    <div className='suggestion-box'>
                        {
                            countries.map(country => 
                                (
                                <div className='country'>
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