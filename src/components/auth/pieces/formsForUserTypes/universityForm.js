import React, { useContext, useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Grid,
    Typography
} from '@material-ui/core';
import {
    ENDPOINT_URLS, REGISTRATION,
    UNIVERSITY_CITIES,
    UNIVERSITY_COUNTRIES, UNIVERSITY_NAME,
    USER_INFO,
    UNIVERSITY_REGISTRATION,
} from '../../../../constants/api.constants';
import { WAIT_ADMIN_CONFIRM } from '../../../../constants/messages.constants';
import { HOME } from '../../../../constants/pathnames.constants';
import { USER_TYPE } from '../../../../constants/ui.constants';
import { formContext } from '../../../../context/formContext';
import DataService from '../../../../services/dataService';
import { getStorageItem } from '../../../../storage';
import { buildCitiesData, buildCountriesData, buildData, getData, getNameById } from '../../../../utils/supporters';
import Header from '../../../headerActions';
import '../../pieces/style.css';
import TextfieldWrapperWrapper from '../../../sharedComponents/textField';
import Button from '../../../sharedComponents/button';
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
                setCities(buildCitiesData(val));
                DataService.universityCountries.next(buildCitiesData(val));
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

    const handelSubmit = (values) => {
        setLoading(true);
        DataService.postJson(ENDPOINT_URLS[REGISTRATION], { ...values })
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
                                    link: userInfo?.surname || '',
                                    countryId: userInfo?.country?.countryId || '',
                                    cityId: userInfo?.city?.cityId || '',
                                    cv: '',
                                    login: '',
                                    password: '',
                                    confirmPassword: '',

                                }}
                                validateOnChange={true}
                                validateOnBlur={true}
                                validateOnMount={true}
                                validationSchema={FORM_UNIVERSITY_REGISTRATION_VALIDATOR}
                                onSubmit={values => {
                                    handelSubmit(values);
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
                                                <span className="typography-text">  Uploaded Files</span>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <UploadInput
                                                className={'pdfInput'}
                                                accept={
                                                    'application/pdf,application/vnd.ms-excel'
                                                }
                                                setFile={setFile}
                                            />

                                        </Grid>
                                        <Grid item xs={12}>
                                            {isAllContent && <TextfieldWrapperWrapper
                                                name="login"
                                                label="Login"

                                            />}
                                        </Grid>
                                        <Grid item xs={6}>
                                            {isAllContent ? (<>
                                                <TextfieldWrapperWrapper
                                                    name="password"

                                                    label="Password"
                                                />
                                            </>) : (<>
                                                <TextfieldWrapperWrapper
                                                    name="password"
                                                    label="New Password"

                                                />
                                            </>)}
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextfieldWrapperWrapper
                                                name="confirmPassword"
                                                label="Confirm Password"

                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div className="block-extended-data">
                                                <Button className="extended-button-submit-1"
                                                    type={type}
                                                    url={ENDPOINT_URLS[UNIVERSITY_REGISTRATION]}
                                                    universities={data}
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
