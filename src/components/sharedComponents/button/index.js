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
    EXTENDED_SEARCH_PATH,
} from "../../../constants/api.constants";
import {
    EDITED_USER_INFO,
    GLOBAL_ERROR, INFOR_FOR_UPLOADED,
    LOGIN_SUCCESS, UPLOADED_FILE,
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
    ...otherProps
}) => {
    const { values, handleReset } = useFormikContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { UNIVERSITY, COMPANY, USER } = USER_TYPE || {};

    const handleResponse = (val) => {
        if (url && url === ENDPOINT_URLS[LOGIN]) {
            setStorageItem("user", val);
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
        } else if (url && url === ENDPOINT_URLS[REGISTRATION]) {
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
            const { universityId, companyId, countryId, cityId, fileName, fileType, name, surName } = values;
            DataService.getJson(ENDPOINT_URLS[EXTENDED_SEARCH_PATH],
                {
                    universityId,
                    companyId,
                    cityId,
                    countryId,
                    user: {
                        name,
                        surName,
                        fileName,
                        fileType,
                    }
                }).then(val => {
                const { data } = val;
                DataService.getExtendedSearchData.next(data);
                console.log(val);
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
                }, 'oldPassword', 'citiId', 'countryId');

                DataService.postJson(ENDPOINT_URLS[EDIT_USER_INFO], {
                    ...currentEditedUserInfo,
                    userType: userID
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
                }, 'oldPassword', 'citiId', 'countryId');

                DataService.postJson(ENDPOINT_URLS[EDIT_USER_INFO], {
                    ...currentEditedUserInfo,
                    userType: userID
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
                }, 'oldPassword', 'citiId', 'countryId');

                DataService.postJson(ENDPOINT_URLS[EDIT_USER_INFO], {
                    ...currentEditedUserInfo,
                    userType: userID
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
            const currentFileName = file?.name.split('.pdf')[0].slice(0, 9);
            file.name = currentFileName;
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
        DataService.postJson(url, { ...currentParams, userType: userID })
            .then((val) => {
                handleResponse(val);
            })
            .catch((e) => {
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
    };

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
