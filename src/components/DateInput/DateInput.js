import React from 'react';

import DatePicker from 'react-date-picker';
import './DateInput.scss';

// Used 'react-date-picker' library for the Calendar UI
// https://projects.wojtekmaj.pl/react-date-picker/

// DateInput Component 
const DateInput = ({ label, value, handleInput }) => {
    return (
        <div className='date-input'>
            <label>
                <h6>{ label }</h6>
            </label>
            <DatePicker
                onChange={ date => {
                    handleInput(date);
                    console.log(date);
                } }
                value={ value }
            />
        </div>
    );
}

export default DateInput;