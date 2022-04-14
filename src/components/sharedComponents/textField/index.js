import React, { useContext, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';
import { formContext } from '../../../context/formContext';

const TextfieldWrapper = ({
    name, ...otherProps
}) => {
    const [field, mata] = useField(name);
    const { setFieldValue, values } = useFormikContext();
    const [, setFormValues] = useContext(formContext);

    useEffect(() => {
        setFormValues(values);
    }, [values]);
    const configTextfield = {
        ...field, ...otherProps, fullWidth: true, variant: 'outlined',
    };

    if (mata && mata.touched && mata.error) {
        configTextfield.error = true;
        configTextfield.helperText = mata.error;
    }

    return (<TextField {...configTextfield} />);
};

export default TextfieldWrapper;
