import React from 'react';
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel
} from '@material-ui/core';

import './style.css';
import { useField, useFormikContext } from 'formik';

const CheckboxWrapper = ({
    name,
    label,
    legend,
    className,
    ...otherProps
}) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);

    const handleChange = evt => {
        const { checked } = evt.target;
        setFieldValue(name, checked);
    };

    const configCheckbox = {
        ...field,
        defaultChecked: field?.value,
        onChange: handleChange
    };

    const configFormControl = {};
    if (meta && meta.touched && meta.error) {
        configFormControl.error = true;
    }

    return (
        <FormControl {...configFormControl}>
            <FormLabel component="legend">{legend}</FormLabel>
            <FormGroup>
                <FormControlLabel
                    className={className || 'checkbox-text'}
                    control={<Checkbox {...configCheckbox} />}
                    label={label}
                />
            </FormGroup>
        </FormControl>
    );
};

export default CheckboxWrapper;
