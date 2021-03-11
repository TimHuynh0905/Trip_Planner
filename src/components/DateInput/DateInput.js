import React, { useState } from 'react';
import './DateInput.scss';
import DatePicker from 'react-date-picker';


const DateInput = ({ label, value, handleInput }) => {
    const [ date, setDate ] = useState(new Date());

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