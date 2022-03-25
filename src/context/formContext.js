import React, { createContext, useState } from 'react';

export const formContext = createContext();

const FormValuesProvider = (props) => {
    const [formValues, setFormValues] = useState(false);

    return (
        <formContext.Provider
            value={[formValues, setFormValues]}
        >
            {props.children}
        </formContext.Provider>
    );
};

export default FormValuesProvider;
