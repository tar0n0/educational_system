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
import { INITIAL_USER_REGISTRATION_STATE } from '../../../../constants/initialFormState.constants';
import { USER_REGISTRATION_VALIDATION } from '../../../../utils/validations';
import { useLocation } from 'react-router-dom';
import { USER_TYPE, useStyles } from '../../../../constants/ui.constants';
import CheckIcon from '@mui/icons-material/Check';
import { CircularProgress } from '@mui/material';

import '../../pieces/style.css';


const UserForm = ({ isAllContent = true, inUniversity = false, inCompany = false }) => {
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

    useEffect(() => {
        if (getStorageItem('user')?.token) {
            setLoading(true);
            DataService.getJson(ENDPOINT_URLS[USER_INFO]).then(val => {
                setUserInfo(() => {
                    return {
                        ...val?.data,
                    };
                });
                setLoading(false);
            });
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
                    <CircularProgress />
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
                                            email: userInfo?.email || '',
                                            phone: userInfo?.phone || '',
                                            cityId: userInfo?.cityId || '',
                                            link: userInfo?.link || '',
                                            isLink: userInfo?.isLink || false,
                                            file: '',
                                            image: '',
                                            countryId: userInfo?.countryId || '',
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
                                                <Grid item xs={6}>
                                                    <Select
                                                        autoComplete="on"
                                                        name="countryId"
                                                        label="Country"
                                                        autoComplete="on"
                                                        options={countries || []}
                                                    />
                                                    <Checkbox
                                                        name="isCountry"
                                                        label="Private Country"
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Select
                                                        name="cityId"
                                                        label="City"
                                                        options={cities || []}
                                                        autoComplete="on"
                                                    />
                                                    <Checkbox
                                                        name="isCity"
                                                        label="Private City"
                                                    />
                                                </Grid>
                                                {type && type !== USER && (
                                                    <Grid item xs={12}>
                                                        <Select
                                                            name={dropdownName}
                                                            label={dropdownLabel}
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
                                                        <UploadInput
                                                            className={'pdfInput'}
                                                            accept={
                                                                'application/pdf,application/vnd.ms-excel'
                                                            }
                                                            setFile={setFile}
                                                        />
                                                        <span>{file && <CheckIcon color="success"/>}</span>
                                                    </div>
                                                    <Checkbox
                                                        name="isCV"
                                                        label="Private CV"
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <div className="container-uploaded-file">
                                                        <UploadInput
                                                            className={'imageInput'}
                                                            accept={'image/*'}
                                                            setFile={setImage}
                                                        />
                                                        <span>{image && <CheckIcon color="success"/>}</span>
                                                    </div>
                                                    <Checkbox
                                                        name="isImage"
                                                        label="Private Image"
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    {isAllContent ? (<TextfieldWrapperWrapper
                                                        type="password"
                                                        name="password"
                                                        autoComplete="on"
                                                        label="Password"
                                                    />) : (
                                                        <TextfieldWrapperWrapper
                                                            type="password"
                                                            name="password"
                                                            autoComplete="on"
                                                            label="New Password"
                                                        />
                                                    )}
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextfieldWrapperWrapper
                                                        type="password"
                                                        name="confirmPassword"
                                                        autoComplete="on"
                                                        label="Confirm Password"
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Button type={type} isLogin={false}
                                                        url={ENDPOINT_URLS[REGISTRATION]}
                                                        file={file} image={image}>
                                                        Submit Form
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
