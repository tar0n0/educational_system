import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useFormikContext } from 'formik';
import { ENDPOINT_URLS, REGISTRATION, LOGIN, UPLOAD_FILE } from '../../../constants/api.constants';
import { GLOBAL_ERROR, LOGIN_SUCCESS, WAIT_ADMIN_CONFIRM } from '../../../constants/messages.constants';
import { USER_ROLES, USER_TYPE } from '../../../constants/ui.constants';
import DataService from '../../../services/dataService';
import { CircularProgress } from '@mui/material';
import { getStorageItem, setStorageItem } from '../../../storage';
import AuthorizationService from '../../../services/authorizationService';
import { toast } from 'react-toastify';
import { removeKeyFromObject } from '../../../utils/helpers';
import { COMPANY_PAGE, HOME, UNIVERSITY_PAGE, USER_PAGE } from '../../../constants/pathnames.constants';
import {
    removeExtraPropsForCompanyForm,
    removeExtraPropsForUniversityForm
} from '../../../constants/initialFormState.constants';

const ButtonWrapper = ({
    children,
    url,
    message,
    isLogin,
    type,
    file,
    image,
    ...otherProps
}) => {
    const { values } = useFormikContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { UNIVERSITY, COMPANY, USER } = USER_TYPE || {};
    const handleResponse = (val) => {

        if (type && type === 'Material uploaded' && file) {
            DataService.postJson(ENDPOINT_URLS[UPLOAD_FILE], {
                ...val,
                name: file?.type || 'File',
                file: file?.name,
            }).then(_ => {
                toast.success(UPLOAD_FILE, {
                    type: toast.TYPE.SUCCESS,
                    icon: true,
                    theme: 'dark'
                });
            }).catch(_ => {
                toast.error(GLOBAL_ERROR, {
                    type: toast.TYPE.ERROR,
                    icon: true,
                    theme: 'dark'
                });
            });
            return;
        }

        if (url === ENDPOINT_URLS[LOGIN]) {
            setStorageItem('user', val);
            AuthorizationService.isUserStatus.next(true);
            if (getStorageItem('user')) {
                switch (getStorageItem('user')?.role) {
                    case 'User':
                        navigate(USER_PAGE);
                        break;
                    case 'Admin': {
                        if(getStorageItem('user').userType === 'Company') {
                            navigate(COMPANY_PAGE);
                        }else if(getStorageItem('user').userType === 'University') {
                            navigate(UNIVERSITY_PAGE);
                        }
                        break;
                    }
                    // case 'Company':
                    //     navigate(COMPANY_PAGE);
                    //     break;
                    // case 'User':
                    //     navigate(USER_PAGE);
                    //     break;
                    // case 'University':
                    //     navigate(UNIVERSITY_PAGE);
                    //     break;
                    default:
                        navigate(HOME);
                        break;
                }
            }
            toast.success(
                LOGIN_SUCCESS, {
                    type: toast.TYPE.SUCCESS,
                    icon: true,
                    theme: 'dark'
                }
            );
        } else if (url === ENDPOINT_URLS[REGISTRATION]) {
            navigate(HOME);
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
        const currentParams = type && (type === UNIVERSITY) ? removeKeyFromObject(values, ...removeExtraPropsForUniversityForm) : removeKeyFromObject(values, ...removeExtraPropsForCompanyForm);
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
