import React from 'react';
import './DateInput.scss';
import DatePicker from 'react-date-picker';


const DateInput = ({ label, value, handleInput }) => {
    return (
        <div className='date-input'>
            <label>
                <h6>{ label }</h6>
            </label>
            <DatePicker
                // dateFormat='MM/yyyy'
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