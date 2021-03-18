import React, { useState, useRef, useEffect } from 'react';

import './DropdownInput.scss';

import FormInput from '../UI/FormInput/FormInput';

// DropdownInput Component 
// (User query input field + dropdown suggestions)
const DropdownInput = ({ label, name, collection, value, handleInput, handleSelect, required }) => {
    
    const node = useRef(); // Capture clicks on components that has this reference

    const [ dropped, setDropped ] = useState(false)     // Dropdown box appears or disappears 
    const [ touched, setTouched ] = useState(false)     // Triggers warning alert for required input

    // Make dropdown box disappears of mouse is clicked outside of the component
    const handleClick = (event) => {
        if (!node.current.contains(event.target)) {
            setDropped(false);
        }
    }

    // Mouse event listeners
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
            {/* Input - query string */}
            <FormInput
                label={ label }
                name={ name }
                type='text'
                value={ value }
                handleChange={ (event) => { handleInput(event.target.value) } }
                onClick={ () => {
                    setDropped(!dropped);
                    setTouched(true);
                } }
                invalid={ touched && !dropped && !value.length ? 'true' : 'false' }
                required={ required }
            />

            {/* Dropdown box */}
            {
                dropped &&
                    <div className='dropdown-box'>
                        {
                            collection.map((obj, idx) => 
                                {
                                    return (
                                        <div 
                                            key={idx} 
                                            className='option'
                                            onClick={ () => {
                                                handleSelect(`${ obj.code } - ${ obj.name }`);
                                                setDropped(false);
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