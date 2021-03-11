import React from 'react';
import './FormInput.scss';

const formInput = ({ handleChange, label, ...otherProps }) => {
    return (
        <div className='form-input'>
            <input className='input' onChange={ handleChange } { ...otherProps }/>
            {
                label ? 
                (
                    <label className={ `${ otherProps.value.length ? 'shrink' : '' }  input-label` }>
                        { label }
                    </label>
                ) : null
            }
            {
                otherProps.touched && otherProps.required && !otherProps.toggleOn && !otherProps.value.length ?
                (
                    <p className='invalid'>Please enter a valid value!</p>
                ) : null
            }
        </div>
    )
}

export default formInput;