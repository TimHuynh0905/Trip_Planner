import React, { useState } from 'react';
import Switch from 'react-switch';

import './ToggleButton.scss';

const ToggleButton = ({ leftValue, rightValue }) => {
    const [ checked, setChecked ] = useState(false);

    return (
        <div className='toggle'>
            <label>
                <span className={ !checked ? 'selected' : '' }>{ leftValue }</span>
                <Switch
                    onChange={ () => setChecked(!checked) }
                    checked={ checked }
                    className='switch'
                />
                <span className={ checked ? 'selected' : '' }>{ rightValue }</span>
            </label>
        </div>
    );
}

export default ToggleButton;