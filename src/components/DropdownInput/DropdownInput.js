import React, { useState, useRef, useEffect } from 'react';

import './DropdownInput.scss';

import FormInput from '../UI/FormInput/FormInput';

const DropdownInput = ({ label, name, collection, value, handleInput, required }) => {
    const node = useRef();

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
        <div className='dropdown-input' ref={ node }>
            <FormInput
                label={ label }
                name={ name }
                type='text'
                value={ value }
                handleChange={ (event) => handleInput(event.target.value) }
                onClick={ () => {
                    setToggle(!toggleOn);
                    setTouched(true);
                } }
                invalid={ touched && !toggleOn && !value.length ? 'true' : 'false' }
                required={ required }
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
                                            className='option'
                                            onClick={ () => {
                                                handleInput(`${ obj.code } - ${ obj.name }`);
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