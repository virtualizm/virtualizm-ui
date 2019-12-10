import { useState, useCallback } from 'react';

export const useFilter = () => {
    const [value, setValue] = useState({});

    const handleChange = useCallback((field) => ({target}) => {
        setValue({
            ...value,
            [field]: target.value
        });
    }, [value]);

    return [value, handleChange];
}