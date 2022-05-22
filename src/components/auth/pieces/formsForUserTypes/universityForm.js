import React, { useContext, useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Grid,
    Typography
} from '@material-ui/core';
import {
    ENDPOINT_URLS,
    UNIVERSITY_CITIES,
    UNIVERSITY_COUNTRIES,
    UNIVERSITY_NAME,
    USER_INFO,
    SAVE_LOGO,
    UNIVERSITY_REGISTRATION,
} from '../../../../constants/api.constants';
import { WAIT_ADMIN_CONFIRM } from '../../../../constants/messages.constants';
import { HOME } from '../../../../constants/pathnames.constants';
import { USER_ROLES, USER_TYPE } from '../../../../constants/ui.constants';
import { formContext } from '../../../../context/formContext';
import DataService from '../../../../services/dataService';
import { getStorageItem } from '../../../../storage';
import { removeKeyFromObject } from '../../../../utils/helpers';
import { buildCitiesData, buildCountriesData, buildData, getData, getNameById } from '../../../../utils/supporters';
import Header from '../../../headerActions';
import '../../pieces/style.css';
import TextfieldWrapperWrapper from '../../../sharedComponents/textField';
import Select from '../../../sharedComponents/select';
import Footer from '../../../sharedComponents/footer/footer';
import UploadInput from '../../../sharedComponents/uploadedFile';
import { FORM_UNIVERSITY_REGISTRATION_VALIDATOR } from '../../../../utils/validations';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const useStyles = makeStyles((theme) => ({
    formWrapper: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(8),
    },
}));

const UniversityForm = ({ isAllContent = true }) => {
    const location = useLocation();
    const isSignUpPage = location?.pathname.replaceAll('/', '').includes('sign-up');
    const type = isSignUpPage ? location.pathname.replaceAll('/', '').replaceAll('sign-up', '').toUpperCase() : '';
    const { UNIVERSITY, COMPANY, USER } = USER_TYPE || {};
    const [file, setFile] = useState();
    const [formValues] = useContext(formContext);
    const [countryId, setCountryId] = useState();
    const navigate = useNavigate();
    const [countries, setCountries] = useState(getData(type));
    const [cities, setCities] = useState([]);
    const [data, setData] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const isToken = getStorageItem('user')?.token || '';
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
            }).finally(() => setLoading(false));
        }
    }, []);

    useEffect(() => {
        DataService.getJson(ENDPOINT_URLS[UNIVERSITY_COUNTRIES]).then(val => {
            DataService.universityCountries.next(buildCountriesData(val));
            setCountries(buildCountriesData(val));
        });
    }, []);

    useEffect(() => {
        if (formValues.countryId && countries.length) {
            DataService.getJson(ENDPOINT_URLS[UNIVERSITY_CITIES](getNameById(countries, formValues.countryId).name)).then(val => {
                const data = val?.data?.cities || val?.data;
                setCountryId(val?.data?.countryId);
                setCities(buildCitiesData(data));
                DataService.universityCountries.next(buildCitiesData(data));
            });
        }
    }, [formValues.countryId]);

    useEffect(() => {
        if (formValues.cityId && formValues.countryId && countries.length && cities.length) {
            let countryName = (getNameById(countries, formValues.countryId) && getNameById(countries, formValues.countryId).name) || '';
            let cityName = (getNameById(cities, formValues.cityId) && getNameById(cities, formValues.cityId).name) || '';
            DataService.getJson(ENDPOINT_URLS[UNIVERSITY_NAME](countryName, cityName))
                .then(val => setData(buildData(val)));
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
        DataService.postJson(ENDPOINT_URLS[UNIVERSITY_REGISTRATION], {
            ...removeKeyFromObject({
                ...data,
                countryId,
                userType: USER_ROLES[UNIVERSITY]
            }, 'confirmPassword')
        })
            .then((val) => {
                const { userId } = val;
                handleResponse(val);
                const formData = new FormData();
                formData.append('imageFile', file);
                formData.append('userId', userId);
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
            <Grid container>
                <Grid item xs={12}>
                    {isAllContent && <Header/>}
                </Grid>
                <Grid item xs={12}>
                    <Container maxWidth="md">
                        <div className={classes.formWrapper}>
                            <Formik
                                initialValues={{
                                    universityId: userInfo?.university || '',
                                    link: userInfo?.link || '',
                                    countryId: userInfo?.country?.countryId || '',
                                    cityId: userInfo?.city?.cityId || '',
                                    name: userInfo?.name || '',
                                    surname: userInfo?.surname || '',
                                    username: userInfo?.username || '',
                                    email: '',
                                    password: '',
                                }}
                                validateOnChange={true}
                                validateOnBlur={true}
                                validateOnMount={true}
                                validationSchema={FORM_UNIVERSITY_REGISTRATION_VALIDATOR}
                                onSubmit={values => {
                                    console.log(values);
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
                                        <Grid item xs={12}>
                                            <TextfieldWrapperWrapper
                                                name="name"
                                                label="First Name"

                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextfieldWrapperWrapper
                                                name="surname"
                                                label="Last Name"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Select
                                                name="countryId"
                                                label="Country"
                                                disabled={Boolean(isToken)}
                                                options={countries || [userInfo?.country] || []}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Select
                                                name="cityId"
                                                label="City"
                                                disabled={Boolean(isToken)}
                                                options={cities || [userInfo?.city] || []}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Select
                                                name="universityId"
                                                label="University"
                                                disabled={Boolean(isToken)}
                                                options={data || []}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextfieldWrapperWrapper
                                                name="link"
                                                label="Link"

                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography>
                                                <span className="typography-text">  Uploaded Logo</span>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <UploadInput
                                                className={'pdfInput'}
                                                accept={
                                                    'image/*'
                                                }
                                                setFile={setFile}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            {isAllContent && <TextfieldWrapperWrapper
                                                name="username"
                                                label="Username"

                                            />}
                                        </Grid>
                                        <Grid item xs={12}>
                                            {isAllContent && <TextfieldWrapperWrapper
                                                name="email"
                                                label="Email"

                                            />}
                                        </Grid>
                                        <Grid item xs={6}>
                                            {isAllContent ? (<>
                                                <TextfieldWrapperWrapper
                                                    name="password"
                                                    type="password"
                                                    label="Password"
                                                />
                                            </>) : (<>
                                                <TextfieldWrapperWrapper
                                                    type="password"
                                                    name="password"
                                                    label="New Password"

                                                />
                                            </>)}
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextfieldWrapperWrapper
                                                type="password"
                                                name="confirmPassword"
                                                label="Confirm Password"

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
            {isAllContent && <Footer/>}
        </>
    );
};

export default UniversityForm;
