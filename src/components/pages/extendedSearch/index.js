import { Container, Grid, Typography } from '@material-ui/core';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    ENDPOINT_URLS,
    GET_ALL_UNIVERSITIES,
    GET_ALL_CITIES,
    GET_ALL_COMPANIES,
    GET_ALL_COUNTRIES,
    EXTENDED_SEARCH_PATH,
    USER_INFO, USER_MATERIALS,
} from '../../../constants/api.constants';
import { INITIAL_EXTENDED_SEARCH_STATE } from '../../../constants/initialFormState.constants';
import { GLOBAL_ERROR } from '../../../constants/messages.constants';
import { USER_TYPES_FOR_MODAL } from '../../../constants/modals.constat';
import { useStyles } from '../../../constants/ui.constants';
import { formContext } from '../../../context/formContext';
import { modalContext } from '../../../context/modalContext';
import AuthorizationService from '../../../services/authorizationService';
import DataService from '../../../services/dataService';
import { getStorageItem } from '../../../storage';
import { buildCitiesData, buildCountriesData, buildData } from '../../../utils/supporters';
import { EXTENDED_SEARCH_VALIDATION } from '../../../utils/validations';
import MyFiles from '../../myFiles';
import ButtonWrapper from '../../sharedComponents/button';
import Footer from '../../sharedComponents/footer/footer';
import AccountMenu from '../../sharedComponents/menuWithAvatar';
import Select from '../../sharedComponents/select';
import TextfieldWrapperWrapper from '../../sharedComponents/textField';

import '../home/home.css';

const ExtendedSearch = () => {
    const { setOpen, setType } = useContext(modalContext);
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [universities, setUniversities] = useState([]);
    // const [userInfo, setUserInfo] = useState(null);
    const [isUser, setIsUser] = useState(false);
    const [extendedData, setExtendedData] = useState([]);
    const [formValues] = useContext(formContext);
    const classes = useStyles();

    useEffect(() => {
        const subscription = AuthorizationService.isUserStatus.subscribe(setIsUser);
        return () => subscription && subscription.unsubscribe();
    }, [isUser]);

    // useEffect(() => {
    //     if (getStorageItem('user')?.token) {
    //         DataService.getJson(ENDPOINT_URLS[USER_INFO]).then(val => {
    //             setUserInfo(() => {
    //                 return {
    //                     ...val?.data,
    //                 };
    //             });
    //         });
    //     }
    // }, []);

    useEffect(() => {
        DataService.getJson(ENDPOINT_URLS[GET_ALL_COUNTRIES]).then(val => {
            setCountries(buildCountriesData(val));
        });
        DataService.getJson(ENDPOINT_URLS[GET_ALL_COMPANIES]).then(val => {
            setCompanies(buildData(val, true));
        });
        DataService.getJson(ENDPOINT_URLS[GET_ALL_CITIES]).then(val => {
            setCities(buildCitiesData(val));
        });
        DataService.getJson(ENDPOINT_URLS[GET_ALL_UNIVERSITIES]).then(val => {
            setUniversities(buildData(val));
        });
    }, []);

    return (
        <>
            <div className="search-header">
                <div className="header">
                    <div className="logo-for-p">
                        <Link to={'/'}><span className="back-to-home">Home</span></Link>
                    </div>
                    <span className="context">Extended Search</span>
                </div>
                <div className="auth">
                    {isUser ? (<AccountMenu/>) : (
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="currentColor"
                                className="bi bi-person-fill"
                                viewBox="0 0 16 16"
                            >
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            </svg>
                            <Link to={'/login'} className="login">
                                Login
                            </Link>
                            <span className="slash">\</span>
                            <span className="sign-up" onClick={() => {
                                setType(USER_TYPES_FOR_MODAL);
                                setOpen(true);
                            }}>
                        SignUp
                            </span>
                        </>
                    )}
                </div>
            </div>
            <div className="content-extended-search">
                {extendedData?.length ? (
                    <>
                        <MyFiles searchData={extendedData} isSearch={true}/>
                    </>
                ) : (
                    <>
                        <Grid container>
                            <Grid item xs={12}>
                                <Container maxWidth="sm">
                                    <div className={classes.formWrapper}>
                                        <Formik
                                            initialValues={{
                                                ...INITIAL_EXTENDED_SEARCH_STATE,
                                            }}
                                            onSubmit={(params) => console.log(params, 'yyy')}
                                        >
                                            <Form>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <Typography>
                                                            <h1 className="login-title-in-login-page">Start Search
                                                                Files</h1>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Select
                                                            name="universityId"
                                                            label="University"
                                                            autoComplete="on"
                                                            options={universities || []}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Select
                                                            name="companyId"
                                                            label="Company"
                                                            autoComplete="on"
                                                            options={companies || []}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Select
                                                            name="cityId"
                                                            label="CityId"
                                                            autoComplete="on"
                                                            options={cities || []}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Select
                                                            name="countryId"
                                                            label="Country"
                                                            autoComplete="on"
                                                            options={countries || []}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextfieldWrapperWrapper
                                                            name="name"
                                                            label="Name"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextfieldWrapperWrapper
                                                            name="surName"
                                                            label="Surname"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextfieldWrapperWrapper
                                                            name="fileName"
                                                            label="File Name"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextfieldWrapperWrapper
                                                            name="fileType"
                                                            label="File Type"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <div className="block-extended-data">
                                                            <Button className="extended-button-submit"
                                                                variant="contained"
                                                                disabled={Object.values(formValues).every(el => !el)}
                                                                onClick={() => {
                                                                    const {
                                                                        universityId,
                                                                        companyId,
                                                                        countryId,
                                                                        cityId,
                                                                        fileName,
                                                                        fileType,
                                                                        name,
                                                                        surName
                                                                    } = formValues;
                                                                    DataService.postJson(ENDPOINT_URLS[EXTENDED_SEARCH_PATH],
                                                                        {
                                                                            universityId: universityId || 0,
                                                                            companyId: companyId || 0,
                                                                            cityId: cityId || 0,
                                                                            countryId: countryId || 0,
                                                                            user: {
                                                                                name,
                                                                                surName,
                                                                                fileName,
                                                                                fileType,
                                                                            }
                                                                        }
                                                                    ).then(val => {
                                                                        DataService.getExtendedSearchData.next(val);
                                                                        setExtendedData(val);
                                                                    }).catch(_ => {
                                                                        toast.error(
                                                                            GLOBAL_ERROR, {
                                                                                type: toast.TYPE.ERROR,
                                                                                icon: true,
                                                                                theme: 'dark'
                                                                            }
                                                                        );
                                                                        setExtendedData([]);
                                                                    });
                                                                }}
                                                            >
                                                                Search
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
            </div>
            <Footer/>
        </>
    );
};

export default ExtendedSearch;
