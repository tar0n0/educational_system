import React, { useContext, useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import {
    Container,
    Grid,
    Typography,
} from '@material-ui/core';
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
import { formContext } from '../../../../context/formContext';
import DataService from '../../../../services/dataService';
import { getStorageItem } from '../../../../storage';
import { parseJwt } from '../../../../utils/helpers';
import {
    buildCitiesData,
    buildCountriesData, buildData,
    getData,
    getNameById,
} from '../../../../utils/supporters';
import Header from '../../../headerActions';
import TextfieldWrapperWrapper from '../../../sharedComponents/textField';
import Checkbox from '../../../sharedComponents/checkbox';
import Button from '../../../sharedComponents/button';
import Select from '../../../sharedComponents/select';
import Footer from '../../../sharedComponents/footer/footer';
import UploadInput from '../../../sharedComponents/uploadedFile';
import { USER_REGISTRATION_VALIDATION } from '../../../../utils/validations';
import { useLocation } from 'react-router-dom';
import { USER_TYPE, useStyles } from '../../../../constants/ui.constants';
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
                break;
            default:
        }
    }, []);

    useEffect(() => {
        if (formValues.countryId && countries.length) {
            switch (type) {
                case UNIVERSITY:
                    DataService.getJson(ENDPOINT_URLS[UNIVERSITY_CITIES](getNameById(countries, formValues.countryId).name)).then(val => {
                        setCities(buildCitiesData(val));
                        DataService.universityCountries.next(buildCitiesData(val));
                    });
                    break;
                case COMPANY:
                    DataService.getJson(ENDPOINT_URLS[COMPANY_CITIES](getNameById(countries, formValues.countryId).name)).then(val => {
                        setCities(buildCitiesData(val));
                        DataService.companiesCities.next(buildCitiesData(val));
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
            switch (type) {
                case UNIVERSITY:
                    DataService.getJson(ENDPOINT_URLS[UNIVERSITY_NAME](countryName, cityName))
                        .then(val => setData(buildData(val)));
                    break;
                case COMPANY:
                    DataService.getJson(ENDPOINT_URLS[COMPANY_NAME](countryName, cityName))
                        .then(val => setData(buildData(val, true)));
                    break;
                default:
            }
        }
    }, [formValues?.cityId, formValues?.countryId, cities?.length]);

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
                                            image: '',
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
                                            isImage: userInfo?.isImage || false,
                                            newPassword: '',
                                            oldPassword: '',
                                        }}
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
                                                        autoComplete="on"
                                                    />
                                                    <Checkbox
                                                        name="isName"
                                                        label="Private First Name"
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextfieldWrapperWrapper
                                                        name="surname"
                                                        label="Surname"
                                                    />
                                                    <Checkbox
                                                        name="isSurname"
                                                        label="Private Surname"
                                                        autoComplete="on"
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextfieldWrapperWrapper
                                                        name="email"
                                                        label="Email"
                                                        autoComplete="on"
                                                        disabled={Boolean(isToken)}
                                                    />
                                                    <Checkbox
                                                        label="Private Email"
                                                        name="isEmail"
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextfieldWrapperWrapper
                                                        name="phone"
                                                        label="Phone"
                                                        autoComplete="on"

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
                                                {type && type !== USER && (
                                                    <Grid item xs={12}>
                                                        <Select
                                                            name={dropdownName}
                                                            label={dropdownLabel}
                                                            disabled={Boolean(isToken)}
                                                            autoComplete="on"
                                                            options={data || []}
                                                        />
                                                        <Checkbox
                                                            name={checkboxName && checkboxName}
                                                            label={`Private ${dropdownLabel && dropdownLabel}`}
                                                        />
                                                    </Grid>
                                                )}
                                                <Grid item xs={12}>
                                                    <Typography>
                                                        <span className="typography-text">  Uploaded Files</span>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextfieldWrapperWrapper
                                                        type="text"
                                                        name="link"
                                                        autoComplete="on"
                                                        label="Link"
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
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
                                                    <div className="container-uploaded-file">
                                                        {image ? <div className="uploaded-file"
                                                            title={image?.name}>{image?.name}</div> : (
                                                            <UploadInput
                                                                className={'imageInput'}
                                                                accept={'image/*'}
                                                                setFile={setImage}
                                                            />
                                                        )}
                                                        <span className="uploaded-icon">{image &&
                                                            <ClearIcon color="error" fontSize={"large"}
                                                                onClick={() => setImage('')}/>}</span>
                                                    </div>
                                                    <Checkbox
                                                        name="isImage"
                                                        label="Private Image"
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextfieldWrapperWrapper
                                                        type="password"
                                                        name={editUserInfo ? 'oldPassword' : 'password'}
                                                        autoComplete="on"
                                                        label={editUserInfo ? 'Old Password' : 'password'}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextfieldWrapperWrapper
                                                        type="password"
                                                        name={editUserInfo ? 'newPassword' : 'confirmPassword'}
                                                        autoComplete="on"
                                                        label={editUserInfo ? 'New Password' : 'Confirm Password'}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Button
                                                        type={type}
                                                        isLogin={false}
                                                        url={ENDPOINT_URLS[REGISTRATION]}
                                                        file={file}
                                                        image={image}
                                                        userInfo={userInfo}
                                                        setClickType={setClickType}
                                                        editUserInfo={editUserInfo}
                                                    >
                                                        {window.location.pathname.split('/').includes('sign-up') ? 'Sign Up' : 'Edit Profile Info'}
                                                    </Button>
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
