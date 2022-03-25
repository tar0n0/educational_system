import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useFormikContext } from 'formik';
import { ENDPOINT_URLS, REGISTRATION } from '../../../constants/api.constants';
import { LOGIN_SUCCESS, WAIT_ADMIN_CONFIRM } from '../../../constants/messages.constants';
import { USER_ROLES, USER_TYPE } from '../../../constants/ui.constants';
import DataService from '../../../services/dataService';
import { CircularProgress } from '@mui/material';
import { getStorageItem, setStorageItem } from '../../../storage';
import AuthorizationService from '../../../services/authorizationService';
import { toast } from 'react-toastify';
import { removeKeyFromObject } from '../../../utils/helpers';

const ButtonWrapper = ({
    children,
    url,
    message,
    isLogin,
    type,
    ...otherProps
}) => {
    const { values } = useFormikContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { UNIVERSITY, COMPANY, USER } = USER_TYPE || {};
    const handleResponse = (val) => {
        if (url !== ENDPOINT_URLS[REGISTRATION]) {
            setStorageItem('user', val);
            AuthorizationService.isUserStatus.next(true);
            getStorageItem('user') ? navigate(`/${val.userType.toLowerCase()}-page`) : navigate('/');
            toast.error(
                LOGIN_SUCCESS, {
                    type: toast.TYPE.SUCCESS,
                    icon: true,
                    theme: 'dark'
                }
            );
        } else {
            navigate('/');
            toast.info(
                WAIT_ADMIN_CONFIRM,
                {
                    type: toast.TYPE.INFO,
                    theme: 'dark',
                }
            );
        }
    };

    const handelSubmit = () => {
        const removableKeysForUniversity = [];
        const removableKeysForCompany = [];
        for (let key in values) {
            if (['Company', 'company'].includes(type)) {
                removableKeysForUniversity.push(key);
            }
            if (['University', 'university'].includes(type)) {
                removableKeysForCompany.push(key);
            }
        }
        const currentParams = type && (type === UNIVERSITY) ? removeKeyFromObject(values, ...removableKeysForUniversity) : removeKeyFromObject(values, ...removableKeysForCompany);
        const userID = type === UNIVERSITY ? USER_ROLES[UNIVERSITY] : type === COMPANY ? USER_ROLES[COMPANY] : USER_ROLES[USER];
        setLoading(true);
        DataService.postJson(url, { ...currentParams, userType: userID }).then(val => {
            handleResponse(val);
        }).catch((e) => {
            toast.error(
                message || e.error.response.data.title || 'Something Went Wrong', {
                    type: toast.TYPE.ERROR,
                    icon: true,
                    theme: 'dark'
                }
            );
        })
            .finally(() => setLoading(false));
    };

    const configButton = {
        variant: 'contained', color: 'primary', fullWidth: true, onClick: handelSubmit,
    };

    return (<Button
        {...configButton}
    >
        {loading ? <CircularProgress/> : children}
    </Button>);
};

export default ButtonWrapper;
