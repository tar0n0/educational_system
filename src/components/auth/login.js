import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import { LOGIN_ERROR } from '../../constants/messages.constants';
import { LOGIN_VALIDATION } from '../../utils/validations';
import {
    Container,
    Grid,
    Typography
} from '@material-ui/core';
import Header from '../headerActions';
import TextfieldWrapperWrapper from '../sharedComponents/textField';
import Footer from '../sharedComponents/footer/footer';
import Checkbox from '../sharedComponents/checkbox';
import { modalContext } from '../../context/modalContext';
import { INITIAL_LOGIN_FORM_STATE } from '../../constants/initialFormState.constants';
import { useStyles } from '../../constants/ui.constants';
import { ENDPOINT_URLS, LOGIN } from '../../constants/api.constants';
import './style.css';
import ButtonWrapper from '../sharedComponents/button';


const Login = () => {
    const classes = useStyles();
    const { setOpen } = useContext(modalContext);


    // const handelSubmit = () => {
    //     console.log(values)
    //     DataService.postJson(ENDPOINT_URLS[LOGIN], values).then(val => console.log(val));
    // }

    return (
        <>
            <Header/>
            <div className="login-container">
                <Grid container>
                    <Grid item xs={12}>
                        <Container maxWidth="sm">
                            <div className={classes.formWrapper}>
                                <Formik
                                    initialValues={{
                                        ...INITIAL_LOGIN_FORM_STATE,
                                    }}
                                    validationSchema={LOGIN_VALIDATION}
                                    onSubmit={(params) => console.log(params, 'yyy')}
                                >
                                    <Form>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Typography>
                                                    <h1 className="login-title-in-login-page">Login to your account</h1>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography>
                                                    <span className="dont-have-account"> Don’t have an account?</span>
                                                    <span className={'link link-login-page'}
                                                        onClick={() => setOpen(true)}>Sign
                                                    up!</span>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextfieldWrapperWrapper
                                                    name="UserName"
                                                    label="Username"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextfieldWrapperWrapper
                                                    type="password"
                                                    name="password"
                                                    label="Password"
                                                />
                                                <Checkbox
                                                    name=""
                                                    label="Remember me"
                                                    className="checkbox-for-remember-me"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ButtonWrapper
                                                    message={LOGIN_ERROR}
                                                    isLogin={true}
                                                    url={ENDPOINT_URLS[LOGIN]}
                                                >
                                                    Submit Form
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

export default Login;
