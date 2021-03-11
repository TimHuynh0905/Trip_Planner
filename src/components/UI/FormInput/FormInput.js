import React from 'react';
import './FormInput.scss';

const formInput = ({ handleChange, label, ...otherProps }) => {
    return (
        <div className='form-input'>
            <input 
                className='input' 
                onChange={ handleChange } { ...otherProps } 
                autoComplete='off'
            />
                {
                    label ? 
                    (
                        <label className={ `${ otherProps.value.length ? 'shrink' : '' }  input-label` }>
                            { label }
                        </label>
                    ) : null
                }
                {
                    otherProps.required && otherProps.invalid === 'true' ?
                    (
                        <p className='invalid'>Please enter a valid value!</p>
                    ) : null
                }
        </div>
    )
}

export default formInput;