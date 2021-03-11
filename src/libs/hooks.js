import { useState } from 'react';

export const useFields = (initialState) => {
    const [ fields, setValues ] = useState(initialState) ;
    return [
        fields,
        (event) => {
            const { value, name } = event.target;

            setValues({
                ...fields,
                [ name ]: value
            });
        }
    ];
}