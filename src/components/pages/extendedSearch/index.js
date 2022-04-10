import { Container, Grid, Typography } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ENDPOINT_URLS, LOGIN, GET_ALL_UNIVERSITIES, GET_ALL_CITIES, GET_ALL_COMPANIES, GET_ALL_COUNTRIES } from '../../../constants/api.constants';
import { INITIAL_EXTENDED_SEARCH_STATE, INITIAL_LOGIN_FORM_STATE } from '../../../constants/initialFormState.constants';
import { LOGIN_ERROR } from '../../../constants/messages.constants';
import { USER_TYPES_FOR_MODAL } from '../../../constants/modals.constat';
import { EXTENDED_SEARCH } from '../../../constants/pathnames.constants';
import { useStyles } from '../../../constants/ui.constants';
import { modalContext } from '../../../context/modalContext';
import AuthorizationService from '../../../services/authorizationService';
import DataService from '../../../services/dataService';
import { EXTENDED_SEARCH_VALIDATION, LOGIN_VALIDATION } from '../../../utils/validations';
import ButtonWrapper from '../../sharedComponents/button';
import Checkbox from '../../sharedComponents/checkbox';
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
    const [isUser, setIsUser] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        const subscription = AuthorizationService.isUserStatus.subscribe(setIsUser);
        return () => subscription && subscription.unsubscribe();
    }, [isUser]);

    useEffect(() => {
        DataService.getJson(ENDPOINT_URLS[GET_ALL_COUNTRIES]).then(val => {
            console.log(val, 'countries');
        });
        DataService.getJson(ENDPOINT_URLS[GET_ALL_COMPANIES]).then(val => {
            console.log(val, 'companies');
        });
        DataService.getJson(ENDPOINT_URLS[GET_ALL_CITIES]).then(val => {
            console.log(val, 'cities');
        });
        DataService.getJson(ENDPOINT_URLS[GET_ALL_UNIVERSITIES]).then(val => {
            console.log(val, 'universities');
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
                <Grid container>
                    <Grid item xs={12}>
                        <Container maxWidth="sm">
                            <div className={classes.formWrapper}>
                                <Formik
                                    initialValues={{
                                        ...INITIAL_EXTENDED_SEARCH_STATE,
                                    }}
                                    validationSchema={EXTENDED_SEARCH_VALIDATION}
                                    onSubmit={(params) => console.log(params, 'yyy')}
                                >
                                    <Form>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Typography>
                                                    <h1 className="login-title-in-login-page">Start Search Files</h1>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Select
                                                    name="UniversityId"
                                                    label="University"
                                                    autoComplete="on"
                                                    options={[]}
                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Select
                                                    name="CompanyId"
                                                    label="Company"
                                                    autoComplete="on"
                                                    options={[]}
                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Select
                                                    name="CityId"
                                                    label="CityId"
                                                    autoComplete="on"
                                                    options={[]}
                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Select
                                                    name="CountryId"
                                                    label="Country"
                                                    autoComplete="on"
                                                    options={[]}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextfieldWrapperWrapper
                                                    name="Name"
                                                    label="Name"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextfieldWrapperWrapper
                                                    name="SurName"
                                                    label="Surname"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextfieldWrapperWrapper
                                                    name="FileName"
                                                    label="File Name"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextfieldWrapperWrapper
                                                    name="FileType"
                                                    label="File Type"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ButtonWrapper
                                                    // message={LOGIN_ERROR}
                                                    // isLogin={true}
                                                    url={ENDPOINT_URLS[LOGIN]}
                                                >
                                                    Search
                                                </ButtonWrapper>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                </Formik>
                            </div>
                        </Container>
                    </Grid>
                </Grid>
            </div>
            <Footer/>
        </>
    );
};

export default ExtendedSearch;
