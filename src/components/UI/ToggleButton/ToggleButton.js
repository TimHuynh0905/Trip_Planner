import React from 'react';
import Switch from 'react-switch';

import './ToggleButton.scss';

const ToggleButton = ({ leftValue, rightValue, handleCheck, checked }) => {
    return (
        <div className='toggle'>
            <label>
                <span className={ checked === 'false' ? 'selected' : '' }>{ leftValue }</span>
                <Switch
                    onChange={ handleCheck }
                    checked={ checked === 'true' }
                    className='switch'
                />
                <span className={ checked === 'true' ? 'selected' : '' }>{ rightValue }</span>
            </label>
        </div>
    );
}

export default ToggleButton;