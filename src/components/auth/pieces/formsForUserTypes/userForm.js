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
    REGISTRATION,
    UNIVERSITY_CITIES,
    UNIVERSITY_COUNTRIES,
    COMPANY_CITIES,
    UNIVERSITY_NAME,
    COMPANY_NAME,
    USER_INFO,
} from '../../../../constants/api.constants';
import { WAIT_ADMIN_CONFIRM } from '../../../../constants/messages.constants';
import { HOME } from '../../../../constants/pathnames.constants';
import { formContext } from '../../../../context/formContext';
import DataService from '../../../../services/dataService';
import { getStorageItem } from '../../../../storage';
import { parseJwt, removeKeyFromObject } from '../../../../utils/helpers';
import {
    buildCitiesData,
    buildCountriesData, buildData,
    getData,
    getNameById,
} from '../../../../utils/supporters';
import Header from '../../../headerActions';
import TextfieldWrapperWrapper from '../../../sharedComponents/textField';
import Checkbox from '../../../sharedComponents/checkbox';
import Button from '@mui/material/Button';
import Select from '../../../sharedComponents/select';
import Footer from '../../../sharedComponents/footer/footer';
import UploadInput from '../../../sharedComponents/uploadedFile';
import { USER_REGISTRATION_VALIDATION } from '../../../../utils/validations';
import { useLocation } from 'react-router-dom';
import { USER_ROLES, USER_TYPE, useStyles } from '../../../../constants/ui.constants';
import ClearIcon from '@mui/icons-material/Clear';
import { CircularProgress } from '@mui/material';

import '../../pieces/style.css';


const UserForm = ({ isAllContent = true, inUniversity = false, inCompany = false, editUserInfo, setClickType }) => {
    const location = useLocation();
    const isSignUpPage = location?.pathname.replaceAll('/', '').includes('sign-up');
    const type = isSignUpPage ? location.pathname.replaceAll('/', '').replaceAll('sign-up', '').toUpperCase() : '';
    const { UNIVERSITY, COMPANY, USER } = USER_TYPE || {};
    const dropdownLabel = (type === UNIVERSITY) ? 'University' : (type === COMPANY) ? 'Company' : '';
    const dropdownName = (type === UNIVERSITY) ? 'university' : (type === COMPANY) ? 'company' : '';
    const checkboxName = (type === UNIVERSITY) ? 'isUniversity' : (type === COMPANY) ? 'isCompany' : '';
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

    useEffect(() => {
        if (getStorageItem('user')?.token) {
            setLoading(true);
            DataService.getJson(ENDPOINT_URLS[USER_INFO]).then(val => {
                setUserInfo(() => {
                    return {
                        ...val?.data,
                    };
                });
            }).finally(() => setLoading(false));
        }
    }, []);
    console.log(type);
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
            if(DataService.getUserCategory.getValue()) {
                DataService.getJson(ENDPOINT_URLS[UNIVERSITY_NAME](countryName, cityName))
                    .then(val => setData(buildData(val)));
            }else {
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

        DataService.postJson(ENDPOINT_URLS[REGISTRATION], {
            ...removeKeyFromObject({
                ...data,
                countryId,
                userType: USER_ROLES[UNIVERSITY]
            }, 'confirmPassword')
        })
            .then((val) => {
                handleResponse(val);
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
                            {isAllContent && !inUniversity && <Header/>}
                        </Grid>
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
                                            oldPassword: '',
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
                                                        {isAllContent &&
                                                            <span className="typography-text">Create Account</span>}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextfieldWrapperWrapper
                                                        name="name"
                                                        label="First Name"
                                                        required={true}
                                                        autoComplete="off"
                                                    />

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextfieldWrapperWrapper
                                                        name="surname"
                                                        label="Surname"
                                                        required={true}
                                                    />

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextfieldWrapperWrapper
                                                        name="email"
                                                        label="Email"
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
                                                        required={true}

                                                    />
                                                    <Checkbox
                                                        label="Private Phone Number"
                                                        name="isPhoneNumber"
                                                    />
                                                </Grid>
                                                {!editUserInfo && !editUserInfo?.isEdit && (
                                                    <Grid item xs={6}>
                                                        <Select
                                                            autoComplete="on"
                                                            name="countryId"
                                                            label="Country"
                                                            autoComplete="on"
                                                            disabled={Boolean(isToken)}
                                                            options={countries || [userInfo?.country] || []}
                                                        />
                                                        <Checkbox
                                                            name="isCountry"
                                                            label="Private Country"
                                                        />
                                                    </Grid>
                                                )}
                                                {!editUserInfo && !editUserInfo?.isEdit && (
                                                    <Grid item xs={6}>
                                                        <Select
                                                            name="cityId"
                                                            label="City"
                                                            options={cities || userInfo?.city || []}
                                                            disabled={Boolean(isToken)}
                                                            autoComplete="on"
                                                        />
                                                        <Checkbox
                                                            name="isCity"
                                                            label="Private City"
                                                        />
                                                    </Grid>
                                                )}
                                                <Grid item xs={12}>
                                                    <Select
                                                        name={DataService.getUserCategory.getValue() ? 'universityId' : 'companyId'}
                                                        label={DataService.getUserCategory.getValue() ? 'University' : 'Company'}
                                                        disabled={Boolean(isToken)}
                                                        autoComplete="on"
                                                        options={data || []}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <TextfieldWrapperWrapper
                                                        type="text"
                                                        name="link"
                                                        autoComplete="off"
                                                        required={true}
                                                        label="Link"
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography>
                                                        <span className="typography-text">  Uploaded Files</span>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <div className="container-uploaded-file">
                                                        {file ? <div className="uploaded-file"
                                                            title={file?.name}>{file?.name}</div> : (
                                                            <UploadInput
                                                                className={'pdfInput'}
                                                                accept={
                                                                    'application/pdf,application/vnd.ms-excel'
                                                                }
                                                                setFile={setFile}
                                                            />
                                                        )}
                                                        <span className="uploaded-icon">{file &&
                                                            <ClearIcon color="error" fontSize={"large"}
                                                                onClick={() => setFile('')}/>}</span>

                                                    </div>
                                                    <Checkbox
                                                        name="isCV"
                                                        label="Private CV"
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextfieldWrapperWrapper
                                                        type="password"
                                                        required={true}
                                                        name={editUserInfo ? 'oldPassword' : 'password'}
                                                        autoComplete="off"
                                                        label={editUserInfo ? 'Old Password' : 'password'}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextfieldWrapperWrapper
                                                        type="password"
                                                        required={true}
                                                        name={editUserInfo ? 'newPassword' : 'confirmPassword'}
                                                        autoComplete="off"
                                                        label={editUserInfo ? 'New Password' : 'Confirm Password'}
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
            {isAllContent && !inUniversity && <Footer/>}
        </>
    );
};

export default UserForm;
