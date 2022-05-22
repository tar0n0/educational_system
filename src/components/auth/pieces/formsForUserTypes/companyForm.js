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
    COMPANY_CITIES,
    COMPANY_COUNTRIES, COMPANY_NAME,
    ENDPOINT_URLS,
    COMPANY_REGISTRATION,
    USER_INFO, SAVE_LOGO
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
import { FORM_COMPANY_REGISTRATION_VALIDATOR } from '../../../../utils/validations';

const useStyles = makeStyles((theme) => ({
    formWrapper: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(8),
    },
}));

const CompanyForm = ({ isAllContent = true }) => {
    const location = useLocation();
    const isSignUpPage = location?.pathname.replaceAll('/', '').includes('sign-up');
    const type = isSignUpPage ? location.pathname.replaceAll('/', '').replaceAll('sign-up', '').toUpperCase() : '';
    const { UNIVERSITY, COMPANY, USER } = USER_TYPE || {};
    const dropdownLabel = (type === UNIVERSITY) ? 'University' : (type === COMPANY) ? 'Company' : '';
    const dropdownName = (type === UNIVERSITY) ? 'university' : (type === COMPANY) ? 'company' : '';
    const checkboxName = (type === UNIVERSITY) ? 'isUniversity' : (type === COMPANY) ? 'isCompany' : '';
    const [file, setFile] = useState();
    const [formValues] = useContext(formContext);
    const [countryId, setCountryId] = useState();
    const [countries, setCountries] = useState(getData(type));
    const [cities, setCities] = useState([]);
    const [data, setData] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const isToken = getStorageItem('user')?.token || '';
    const navigate = useNavigate();
    const classes = useStyles();
    const handleSubmit = (params) => {
    };

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
        DataService.getJson(ENDPOINT_URLS[COMPANY_COUNTRIES]).then(val => {
            DataService.companyCountries.next(buildCountriesData(val));
            setCountries(buildCountriesData(val));
        });
    }, []);

    useEffect(() => {
        if (formValues.countryId && countries.length) {
            DataService.getJson(ENDPOINT_URLS[COMPANY_CITIES](getNameById(countries, formValues.countryId).name)).then(val => {
                const data = val?.data?.cities || val?.data;
                setCountryId(val?.data.countryId);
                setCities(buildCitiesData(data));
                DataService.companiesCities.next(buildCitiesData(data));
            });

        }
    }, [formValues.countryId]);

    useEffect(() => {
        if (formValues.cityId && formValues.countryId && countries.length && cities.length) {
            let countryName = (getNameById(countries, formValues.countryId) && getNameById(countries, formValues.countryId).name) || '';
            let cityName = (getNameById(cities, formValues.cityId) && getNameById(cities, formValues.cityId).name) || '';
            DataService.getJson(ENDPOINT_URLS[COMPANY_NAME](countryName, cityName))
                .then(val => setData(buildData(val, true)));
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
        DataService.postJson(ENDPOINT_URLS[COMPANY_REGISTRATION], {
            ...removeKeyFromObject({
                ...data,
                countryId,
                userType: USER_ROLES[COMPANY]
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
                                    companyId: userInfo?.companyId || '',
                                    email: userInfo?.email || '',
                                    link: userInfo?.link || '',
                                    countryId: userInfo?.country?.countryId || '',
                                    cityId: userInfo?.city?.cityId || '',
                                    username: userInfo?.username || '',
                                    login: '',
                                    password: '',
                                }}
                                validateOnChange={true}
                                validateOnBlur={true}
                                validateOnMount={true}
                                validationSchema={FORM_COMPANY_REGISTRATION_VALIDATOR}
                                onSubmit={values => {

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
                                                name="companyId"
                                                label="Company"
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
                                                name="username"
                                                label="Username"

                                            />}
                                        </Grid>
                                        <Grid item xs={12}>
                                            {isAllContent && <TextfieldWrapperWrapper
                                                name="login"
                                                label="Login"
                                            />
                                            }
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
                                                    name="password"
                                                    type="password"
                                                    label="New Password"
                                                />
                                            </>)}
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextfieldWrapperWrapper
                                                name="confirmPassword"
                                                type="password"
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
}
;

export default CompanyForm;
