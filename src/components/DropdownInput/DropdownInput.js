import React, { useState, useRef, useEffect } from 'react';

import './DropdownInput.scss';

import FormInput from '../UI/FormInput/FormInput';

const DropdownInput = ({ label, name, collection }) => {
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
                invalid={ touched && !toggleOn && !country.length ? 'true' : 'false' }
                required
            />
            {
                toggleOn &&
                    <div className='dropdown-box'>
                        {
                            collection.map((obj, idx) => 
                                {
                                    return (
                                        <div 
                                            key={idx} 
                                            className='country'
                                            onClick={ () => {
                                                setCountry(`${ obj.code } - ${ obj.name }`);
                                                setToggle(false);
                                            }}>
                                                <h6>{ obj.code } - { obj.name }</h6>
                                        </div>
                                    )
                                }
                            )
                        }
                    </div>
            }
        </div>
    );
}

export default DropdownInput;