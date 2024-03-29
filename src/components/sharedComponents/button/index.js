import axios from 'axios';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useFormikContext } from "formik";
import configs from '../../../configs/mainConfigs';
import {
    ENDPOINT_URLS,
    REGISTRATION,
    LOGIN,
    UPLOAD_FILE,
    EDIT_USER_INFO,
    USER_MATERIALS,
    EXTENDED_SEARCH_PATH,
    COMPANY_REGISTRATION,
    UNIVERSITY_REGISTRATION,
} from "../../../constants/api.constants";
import {
    EDITED_USER_INFO,
    GLOBAL_ERROR,
    INFOR_FOR_UPLOADED,
    LOGIN_SUCCESS,
    UPLOADED_FILE,
    WAIT_ADMIN_CONFIRM,
} from "../../../constants/messages.constants";
import { USER_ROLES, USER_TYPE } from "../../../constants/ui.constants";
import DataService from "../../../services/dataService";
import { CircularProgress } from "@mui/material";
import { getStorageItem, setStorageItem } from "../../../storage";
import AuthorizationService from "../../../services/authorizationService";
import { toast } from "react-toastify";
import { parseJwt, removeKeyFromObject } from "../../../utils/helpers";
import {
    COMPANY_PAGE,
    HOME,
    UNIVERSITY_PAGE,
    USER_PAGE,
} from "../../../constants/pathnames.constants";
import {
    removeExtraPropsForCompanyForm,
    removeExtraPropsForUniversityForm,
} from "../../../constants/initialFormState.constants";

const ButtonWrapper = ({
    children,
    url,
    message,
    isLogin,
    type,
    file,
    setFile,
    image,
    userInfo,
    editUserInfo,
    setClickType,
    universities,
    companies,
    ...otherProps
}) => {
    const { values, handleReset } = useFormikContext() || {};
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { UNIVERSITY, COMPANY, USER } = USER_TYPE || {};

    const handleResponse = (val) => {
        if (url && url === ENDPOINT_URLS[LOGIN]) {
            setStorageItem("user", val);
            const userCurrentData = parseJwt(getStorageItem('user')?.token);
            const avatarID = `${userCurrentData?.Name[0]?.toUpperCase()}${userCurrentData?.Surname[0]?.toUpperCase()}`;
            window?.localStorage.setItem('avatar', avatarID);
            AuthorizationService.isUserStatus.next(true);
            DataService.getUserInfo.next({
                userData: parseJwt(val?.token),
                refreshToken: val?.refreshToken,
            });
            if (getStorageItem("user")) {
                switch (getStorageItem("user")?.role) {
                    case "User":
                        navigate(USER_PAGE);
                        break;
                    case "Admin": {
                        if (getStorageItem("user").userType === "Company") {
                            navigate(COMPANY_PAGE);
                        } else if (
                            getStorageItem("user").userType === "University"
                        ) {
                            navigate(UNIVERSITY_PAGE);
                        }
                        break;
                    }
                    default:
                        navigate(HOME);
                        break;
                }
            }
            toast.success(LOGIN_SUCCESS, {
                type: toast.TYPE.SUCCESS,
                icon: true,
                theme: "dark",
            });
        } else if (url && url === ENDPOINT_URLS[REGISTRATION] || url === ENDPOINT_URLS[UNIVERSITY_REGISTRATION] || url === ENDPOINT_URLS[COMPANY_REGISTRATION]) {
            navigate(HOME);
            toast.info(WAIT_ADMIN_CONFIRM, {
                type: toast.TYPE.INFO,
                theme: "dark",
            });
        }
    };

    const handelSubmit = async () => {
        const currentParams =
                type && type === UNIVERSITY
                    ? removeKeyFromObject(
                        values,
                        ...removeExtraPropsForUniversityForm
                    )
                    : removeKeyFromObject(
                        values,
                        ...removeExtraPropsForCompanyForm
                    );
        const userID =
                type === UNIVERSITY
                    ? USER_ROLES[UNIVERSITY]
                    : type === COMPANY
                        ? USER_ROLES[COMPANY]
                        : USER_ROLES[USER];

        if (url && url === ENDPOINT_URLS[EXTENDED_SEARCH_PATH]) {
            DataService.getJson(ENDPOINT_URLS[USER_MATERIALS],
            ).then(val => {
                const { data } = val;
                DataService.getExtendedSearchData.next(data);
            }).catch(_ => {
                toast.error(
                    GLOBAL_ERROR, {
                        type: toast.TYPE.ERROR,
                        icon: true,
                        theme: 'dark'
                    }
                );
                DataService.getExtendedSearchData.next([]);
            });
            return;
        }

        if (editUserInfo && Object?.keys(editUserInfo)?.length) {
            const { name, isEdit } = editUserInfo || {};
            if (name && name === USER_TYPE.UNIVERSITY && isEdit) {
                const currentEditedUserInfo = removeKeyFromObject({
                    ...userInfo,
                    ...currentParams,
                    password: currentParams?.oldPassword,
                    newPassword: currentParams?.newPassword,
                    link: userInfo?.link || currentParams?.link || null
                }, ...['oldPassword', 'cityId', 'countryId', 'companyId', 'universityId', 'file', 'image', 'isCV', 'isImage', 'userType',]);
                if (file) {
                    const formData = new FormData();
                    formData.append('files', file);
                    formData.append('FileVersion', 1);
                    setLoading(true);
                    axios.post(`${configs.connection.server_url + ENDPOINT_URLS[UPLOAD_FILE]}`, formData, {
                        headers: {
                            Authorization: `Bearer ${getStorageItem('user')?.token}`
                        },
                    })
                        .then((val) => {
                            toast.success(UPLOADED_FILE, {
                                type: toast.TYPE.SUCCESS,
                                icon: true,
                                theme: "dark",
                            });
                            handleReset();
                            setFile(null);
                        });

                }
                DataService.postJson(ENDPOINT_URLS[EDIT_USER_INFO], {
                    ...currentEditedUserInfo,
                    city: {
                        cityId: currentEditedUserInfo?.city?.cityId
                    },
                    country: {
                        countryId: currentEditedUserInfo?.country?.countryId
                    },
                    // userType: userID
                }).then(() => {
                    toast.success(EDITED_USER_INFO, {
                        type: toast.TYPE.SUCCESS,
                        icon: true,
                        theme: "dark",
                    });
                    setClickType((prev) => {
                        return '';
                    });
                });
            } else if (name && name === USER_TYPE?.COMPANY && isEdit) {
                const currentEditedUserInfo = removeKeyFromObject({
                    ...userInfo,
                    ...currentParams,
                    password: currentParams?.oldPassword,
                    newPassword: currentParams?.newPassword,
                    link: userInfo?.link || currentParams?.link || null
                }, ...['oldPassword', 'cityId', 'countryId', 'companyId', 'universityId', 'file', 'image', 'isCV', 'isImage', 'userType']);
                if (file) {
                    const formData = new FormData();
                    formData.append('files', file);
                    formData.append('FileVersion', 1);
                    setLoading(true);
                    axios.post(`${configs.connection.server_url + ENDPOINT_URLS[UPLOAD_FILE]}`, formData, {
                        headers: {
                            Authorization: `Bearer ${getStorageItem('user')?.token}`
                        },
                    })
                        .then((_) => {
                            toast.success(UPLOADED_FILE, {
                                type: toast.TYPE.SUCCESS,
                                icon: true,
                                theme: "dark",
                            });
                            handleReset();
                            setFile(null);
                        });
                }
                DataService.postJson(ENDPOINT_URLS[EDIT_USER_INFO], {
                    ...currentEditedUserInfo,
                    city: {
                        cityId: currentEditedUserInfo?.city?.cityId
                    },
                    country: {
                        countryId: currentEditedUserInfo?.country?.countryId
                    },
                    // userType: userID
                }).then(() => {
                    toast.success(EDITED_USER_INFO, {
                        type: toast.TYPE.SUCCESS,
                        icon: true,
                        theme: "dark",
                    });
                    setClickType((prev) => {
                        return '';
                    });
                });
            } else if (name && name === USER_TYPE?.USER && isEdit) {
                const currentEditedUserInfo = removeKeyFromObject({
                    ...userInfo,
                    ...currentParams,
                    password: currentParams?.oldPassword,
                    newPassword: currentParams?.newPassword,
                    link: userInfo?.link || currentParams?.link || null
                }, ...['oldPassword', 'cityId', 'countryId', 'companyId', 'universityId', 'file', 'image', 'isCV', 'isImage', 'userType']);
                if (file) {
                    const formData = new FormData();
                    formData.append('files', file);
                    formData.append('FileVersion', 1);
                    setLoading(true);
                    axios.post(`${configs.connection.server_url + ENDPOINT_URLS[UPLOAD_FILE]}`, formData, {
                        headers: {
                            Authorization: `Bearer ${getStorageItem('user')?.token}`
                        },
                    })
                        .then((_) => {
                            toast.success(UPLOADED_FILE, {
                                type: toast.TYPE.SUCCESS,
                                icon: true,
                                theme: "dark",
                            });
                            handleReset();
                            setFile(null);
                        });
                }
                DataService.postJson(ENDPOINT_URLS[EDIT_USER_INFO], {
                    ...currentEditedUserInfo,
                    city: {
                        cityId: currentEditedUserInfo?.city?.cityId
                    },
                    country: {
                        countryId: currentEditedUserInfo?.country?.countryId
                    },
                    // userType: userID
                }).then(() => {
                    toast.success(EDITED_USER_INFO, {
                        type: toast.TYPE.SUCCESS,
                        icon: true,
                        theme: "dark",
                    });
                    setClickType((prev) => {
                        return '';
                    });
                });
            }
            return;
        }

        if (url && url === ENDPOINT_URLS[UPLOAD_FILE] && file) {
            const formData = new FormData();
            formData.append('files', file);
            formData.append('FileVersion', 2);
            setLoading(true);
            axios.post(`${configs.connection.server_url + ENDPOINT_URLS[UPLOAD_FILE]}`, formData, {
                headers: {
                    Authorization: `Bearer ${getStorageItem('user')?.token}`
                },
            })
                .then((_) => {
                    toast.success(UPLOADED_FILE, {
                        type: toast.TYPE.SUCCESS,
                        icon: true,
                        theme: "dark",
                    });
                    handleReset();
                    setFile(null);
                    toast.info(INFOR_FOR_UPLOADED, {
                        type: toast.TYPE.INFO,
                        icon: true,
                        theme: "dark",
                    });
                })
                .catch((_) => {
                    toast.error(GLOBAL_ERROR, {
                        type: toast.TYPE.ERROR,
                        icon: true,
                        theme: "dark",
                    });

                }).finally(() => setLoading(false));
            return;
        }

        setLoading(true);

        const universityName = type && type === USER_TYPE.UNIVERSITY && Object?.keys(universities)?.length && universities?.find(el => el?.id === currentParams?.universityId);
        const companyName = type && type === USER_TYPE.COMPANY && Object?.keys(companies)?.length && companies?.find(el => el?.id === currentParams?.companyId);

        DataService.postJson(url, {
            ...removeKeyFromObject({
                ...currentParams,
                ...(type && type === USER_TYPE.COMPANY ? {
                    ...currentParams,
                    email: currentParams?.login,
                    name: (companyName && companyName?.name) || currentParams?.companyId,
                    surname: 'COMPANY',
                } : {}),
                ...(type && type === USER_TYPE.UNIVERSITY ? {
                    ...currentParams,
                    email: currentParams?.login,
                } : {}),
            }, 'login'),
            userType: userID === 3 ? DataService.getUserType.getValue() : userID,
        })
            .then((val) => {
                handleResponse(val);
            })
            .catch((e) => {
                if (url === ENDPOINT_URLS[REGISTRATION]) {
                    console.log(e);
                }
                toast.error(
                    message ||
                        e.error.response.data.title ||
                        "Something Went Wrong",
                    {
                        type: toast.TYPE.ERROR,
                        icon: true,
                        theme: "dark",
                    }
                );
            })
            .finally(() => setLoading(false));
    }
    ;

    const configButton = {
        variant: "contained",
        color: "primary",
        fullWidth: true,
        onClick: handelSubmit,
    };

    return (
        <Button {...configButton} disabled={loading}>
            {loading ? <CircularProgress/> : children}
        </Button>
    );
};

export default ButtonWrapper;
