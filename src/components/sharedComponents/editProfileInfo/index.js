import React, { useContext, useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import {
    Container,
    Grid,
    Typography,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
    COMPANY_COUNTRIES,
    ENDPOINT_URLS,
    EDIT_ORGANIZATION_INFO,
    UNIVERSITY_CITIES,
    UNIVERSITY_COUNTRIES,
    COMPANY_CITIES,
    UNIVERSITY_NAME,
    COMPANY_NAME,
    SAVE_LOGO,
    GET_EDITED_PROFILE_INFO,
} from '../../../constants/api.constants';
import { WAIT_ADMIN_CONFIRM } from '../../../constants/messages.constants';
import { HOME } from '../../../constants/pathnames.constants';
import { formContext } from '../../../context/formContext';
import DataService from '../../../services/dataService';
import { getStorageItem } from '../../../storage';
import { parseJwt, removeKeyFromObject } from '../../../utils/helpers';
import {
    buildCitiesData,
    buildCountriesData, buildData,
    getData,
    getNameById,
} from '../../../utils/supporters';
import Button from '@mui/material/Button';
import Select from '../select';
import TextfieldWrapperWrapper from '../textField';
import UploadInput from '../uploadedFile';
import { USER_REGISTRATION_VALIDATION } from '../../../utils/validations';
import { useLocation } from 'react-router-dom';
import { USER_TYPE, useStyles } from '../../../constants/ui.constants';
import ClearIcon from '@mui/icons-material/Clear';
import { CircularProgress } from '@mui/material';

// import '../../pieces/style.css';


const EditProfileInfo = () => {
    const location = useLocation();
    const isSignUpPage = location?.pathname.replaceAll('/', '').includes('sign-up');
    const type = isSignUpPage ? location.pathname.replaceAll('/', '').replaceAll('sign-up', '').toUpperCase() : '';
    const { UNIVERSITY, COMPANY, USER } = USER_TYPE || {};
    const [file, setFile] = useState();
    const [countryId, setCountryId] = useState();
    const [image, setImage] = useState();
    const [countries, setCountries] = useState(getData(type));
    const [cities, setCities] = useState([]);
    const [data, setData] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formValues] = useContext(formContext);
    const classes = useStyles();
    const isToken = getStorageItem('user')?.token || '';
    const userData = getStorageItem('user')?.token && parseJwt(getStorageItem('user')?.token);
    const navigate = useNavigate();
    const userId = parseJwt(getStorageItem('user')?.token)?.UserId;

    useEffect(() => {
        if (getStorageItem('user')?.token) {
            setLoading(true);
            DataService.getJson(ENDPOINT_URLS[GET_EDITED_PROFILE_INFO]).then(val => {
                setUserInfo(() => {
                    return {
                        ...val?.data,
                    };
                });
            }).finally(() => setLoading(false));
        }
    }, []);
    useEffect(() => {
        switch (type) {
            case UNIVERSITY:
                DataService.getJson(ENDPOINT_URLS[UNIVERSITY_COUNTRIES]).then(val => {
                    DataService.universityCountries.next(buildCountriesData(val));
                    setCountries(buildCountriesData(val));
                });
                break;
            case COMPANY:
                DataService.getJson(ENDPOINT_URLS[COMPANY_COUNTRIES]).then(val => {
                    DataService.companyCountries.next(buildCountriesData(val));
                    setCountries(buildCountriesData(val));
                });
            case USER:
                DataService.getJson(ENDPOINT_URLS[COMPANY_COUNTRIES]).then(val => {
                    DataService.companyCountries.next(buildCountriesData(val));
                    setCountries(buildCountriesData(val));
                });
                break;
            default:
        }
    }, []);

    useEffect(() => {
        if (formValues.countryId && countries.length) {
            switch (type) {
                case UNIVERSITY:
                    DataService.getJson(ENDPOINT_URLS[UNIVERSITY_CITIES](getNameById(countries, formValues.countryId).name)).then(val => {
                        const data = val?.data?.cities || val?.data;
                        setCountryId(val?.data?.countryId);
                        setCities(buildCitiesData(data));
                        DataService.universityCountries.next(buildCitiesData(data));
                    });
                    break;
                case COMPANY:
                    DataService.getJson(ENDPOINT_URLS[COMPANY_CITIES](getNameById(countries, formValues.countryId).name)).then(val => {
                        const data = val?.data?.cities || val?.data;
                        setCountryId(val?.data?.countryId);
                        setCities(buildCitiesData(data));
                        DataService.companiesCities.next(buildCitiesData(data));
                    });
                    break;
                case USER:
                    DataService.getJson(ENDPOINT_URLS[COMPANY_CITIES](getNameById(countries, formValues.countryId).name)).then(val => {
                        const data = val?.data?.cities || val?.data;
                        setCountryId(val?.data?.countryId);
                        setCities(buildCitiesData(data));
                        DataService.companiesCities.next(buildCitiesData(data));
                    });
                    break;
                default:
            }
        }
    }, [formValues.countryId]);

    useEffect(() => {
        if (formValues.cityId && formValues.countryId && countries.length && cities.length) {
            let countryName = (getNameById(countries, formValues.countryId) && getNameById(countries, formValues.countryId).name) || '';
            let cityName = (getNameById(cities, formValues.cityId) && getNameById(cities, formValues.cityId).name) || '';
            if (DataService.getUserCategory.getValue()) {
                DataService.getJson(ENDPOINT_URLS[UNIVERSITY_NAME](countryName, cityName))
                    .then(val => setData(buildData(val)));
            } else {
                DataService.getJson(ENDPOINT_URLS[COMPANY_NAME](countryName, cityName))
                    .then(val => setData(buildData(val, true)));
            }
            // switch (type) {
            //     case UNIVERSITY:
            //         DataService.getJson(ENDPOINT_URLS[UNIVERSITY_NAME](countryName, cityName))
            //             .then(val => setData(buildData(val)));
            //         break;
            //     case COMPANY:
            //         DataService.getJson(ENDPOINT_URLS[COMPANY_NAME](countryName, cityName))
            //             .then(val => setData(buildData(val, true)));
            //         break;
            //     default:
            // }
        }
    }, [formValues?.cityId, formValues?.countryId, cities?.length]);

    const handleResponse = (val) => {
        navigate(HOME);
        toast.info(WAIT_ADMIN_CONFIRM, {
            type: toast.TYPE.INFO,
            theme: "dark",
        });
    };

    const handelSubmit = (data = {}) => {
        setLoading(true);

        DataService.postJson(ENDPOINT_URLS[EDIT_ORGANIZATION_INFO], {
            ...removeKeyFromObject({
                ...data,
                ...(DataService.getUserCategory.getValue() ? { userCategory: DataService.getUserCategory.getValue() } : {}),
                countryId,
                userType: DataService.getUserType.getValue(),
                userId: userId,
            }, 'confirmPassword')
        })
            .then((val) => {
                // const { userId } = val;
                handleResponse(val);
                const formData = new FormData();
                formData.append('imageFile', file);
                formData.append('userId', userId);
                // formData.append('fileVersion', 2);
                DataService.postJson(ENDPOINT_URLS[SAVE_LOGO], formData);
            })
            .catch((e) => {
                console.log(e, 'error');

                toast.error(
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

    return (
        <>
            {loading ? (
                <div>
                    <CircularProgress/>
                </div>
            ) : (
                <>
                    <Grid container>
                        <Grid item xs={12}>
                            <Container maxWidth="md">
                                <div className={classes.formWrapper}>
                                    <Formik
                                        initialValues={{
                                            name: userInfo?.name || '',
                                            surname: userInfo?.surname || '',
                                            email: userInfo?.email || userData?.Email || '',
                                            phone: userInfo?.phone || '',
                                            cityId: userInfo?.city?.cityId || '',
                                            link: userInfo?.link || '',
                                            isLink: userInfo?.isLink || false,
                                            file: '',
                                            username: userInfo?.username || '',
                                            OrganizationName: userInfo?.organizationName || '',
                                            // image: '',
                                            countryId: userInfo?.country?.countryId || '',
                                            password: userInfo?.password || '',
                                            confirmPassword: userInfo?.confirmPassword || '',
                                            universityId: userInfo?.universityId || '',
                                            companyId: userInfo?.companyId || '',
                                            isUniversity: userInfo?.isUniversity || false,
                                            isCompany: userInfo?.isCompany || false,
                                            isName: userInfo?.isName || false,
                                            isSurname: userInfo?.isSurname || false,
                                            isEmail: userInfo?.isEmail || false,
                                            isPhoneNumber: userInfo?.isPhoneNumber || false,
                                            isCountry: userInfo?.isCountry || false,
                                            isCity: userInfo?.isCity || false,
                                            isCV: userInfo?.isCV || false,
                                            // isImage: userInfo?.isImage || false,
                                            newPassword: '',
                                            // oldPassword: '',
                                        }}
                                        validateOnBlur={true}
                                        validateOnChange={true}
                                        isInitialValid={true}
                                        validateOnMount={true}
                                        validationSchema={USER_REGISTRATION_VALIDATION}
                                        onSubmit={() => {

                                        }}
                                    >
                                        <Form>
                                            <Grid container spacing={2}>

                                                <Grid item xs={12}>
                                                    <Typography>
                                                        <span className="typography-text">Edit User Info</span>}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextfieldWrapperWrapper
                                                        name="name"
                                                        label="First Name "
                                                        required={true}
                                                        autoComplete="off"
                                                    />

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextfieldWrapperWrapper
                                                        name="surname"
                                                        label="Last name "
                                                        required={true}
                                                    />

                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextfieldWrapperWrapper
                                                        name="username"
                                                        label="Username *"

                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextfieldWrapperWrapper
                                                        name="email"
                                                        label="Email "
                                                        autoComplete="off"
                                                        required={true}
                                                        disabled={Boolean(isToken)}
                                                    />

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextfieldWrapperWrapper
                                                        name="phone"
                                                        label="Phone"
                                                        autoComplete="on"

                                                    />
                                                    {/*<Checkbox*/}
                                                    {/*    label="Private Phone Number"*/}
                                                    {/*    name="isPhoneNumber"*/}
                                                    {/*/>*/}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextfieldWrapperWrapper
                                                        type="text"
                                                        name="OrganizationName"
                                                        autoComplete="off"
                                                        label="Organization Name "
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <TextfieldWrapperWrapper
                                                        type="text"
                                                        name="link"
                                                        autoComplete="off"
                                                        label="Link "
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography>
                                                        <span className="typography-text">  Uploaded Image</span>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <div className="container-uploaded-file">
                                                        {file ? <div className="uploaded-file"
                                                            title={file?.name}>{file?.name}</div> : (
                                                            <UploadInput
                                                                className={'pdfInput'}
                                                                accept={
                                                                    'image/*'
                                                                }
                                                                setFile={setFile}
                                                            />
                                                        )}
                                                        <span className="uploaded-icon">{file &&
                                                            <ClearIcon color="error" fontSize={"large"}
                                                                onClick={() => setFile('')}/>}</span>

                                                    </div>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextfieldWrapperWrapper
                                                        type="password"
                                                        name={'password'}
                                                        autoComplete="off"
                                                        label={'Old Password'}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextfieldWrapperWrapper
                                                        type="password"
                                                        required={true}
                                                        name={'newPassword'}
                                                        autoComplete="off"
                                                        label={'New Password '}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <div className="block-extended-data">
                                                        <Button className="extended-button-submit-1"
                                                            variant="contained"
                                                            onClick={() => handelSubmit(formValues)}
                                                            // type={type}
                                                            // url={ENDPOINT_URLS[UNIVERSITY_REGISTRATION]}
                                                            // universities={data}
                                                        >
                                                            Submit
                                                        </Button>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Form>
                                    </Formik>
                                </div>
                            </Container>
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    );
};

export default EditProfileInfo;
