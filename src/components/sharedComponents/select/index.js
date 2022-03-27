import React, { useContext, useRef } from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';
// import { USER_TYPE } from '../../../constants/ui.constants';
import { formContext } from '../../../context/formContext';

const SelectWrapper = ({ name, options, ...otherProps }) => {
    const { setFieldValue, values } = useFormikContext();
    const [field, meta] = useField(name);
    const nodeRef = useRef(null);
    // const { UNIVERSITY, COMPANY, USER } = USER_TYPE || {};
    // const { pathname } = window.location;
    // let currentType = pathname.split('/').map((el) => el.toUpperCase());
    const [, setFormValues] = useContext(formContext);
    const handleChange = (evt) => {
        const { value } = evt.target;
        setFormValues({
            ...values,
            [name]: value,
        });
        setFieldValue(name, value);
    };

    const configSelect = {
        ...field,
        ...otherProps,
        select: true,
        variant: 'outlined',
        fullWidth: true,
        onChange: handleChange,
    };

    if (meta && meta.touched && meta.error) {
        configSelect.error = true;
        configSelect.helperText = meta.error;
    }

    return (
        <TextField {...configSelect} defaultValue="" ref={nodeRef}>
            {Object.keys(options).map((item) => {
                return (
                    <MenuItem key={item} value={options[item].id || ''} ref={nodeRef}>
                        {options[item].name}
                    </MenuItem>
                );
            })}
        </TextField>
    );
};

export default SelectWrapper;
