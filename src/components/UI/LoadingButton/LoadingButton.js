import React from 'react';
import './LoadingButton.scss';

const LoadingButton = ({ loading, label, ...otherProps }) => {
    return (
        <button className='loading-button' { ...otherProps }>
            {
                !otherProps.disabled && loading 
                ? (
                    <>
                        <i className="fa fa-spinner fa-spin"></i>
                        Loading
                    </>
                )
                : (
                    <>{ label }</>
                )
            }
        </button>
    );
}

export default LoadingButton;