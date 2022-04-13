import { Container, Grid } from '@material-ui/core';
import Avatar from '@mui/material/Avatar';
import { Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { userIdContext } from '../../../context/userIdContext';
import company from '../../pages/rolePages/company';
import Footer from '../../sharedComponents/footer/footer';
import { useNavigate } from 'react-router-dom';
import CarouselS from '../../sharedComponents/slideShow';
import AuthorizationService from '../../../services/authorizationService';
import { makeStyles } from "@material-ui/core/styles";
import DataService from '../../../services/dataService';
import { ENDPOINT_URLS, GET_ALL_USER_PROFILE_DATA } from '../../../constants/api.constants';
import TextfieldWrapperWrapper from '../textField';

import './user..css';

const useStyles = makeStyles(theme => ({
    pageTitle: {
        display: "block",
        margin: "16px 0px 32px 0px",
        width: "100%",
        justifyContent: "center",
        color: "#194d94",
        fontFamily: "sans-serif",
        fontWeight: "normal",
        fontStyle: "italic",
        fontSize: "55px",
        marginTop: "20px",
        textAlign: "center",
    },
    cardsLayout: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gridGap: "30px",
        maxWidth: "900px",
        margin: "0 auto 20px"
    },
    cardsLayoutItem: {
        position: "relative"
    }
}));

const UserProfileWithAvatar = () => {
    const [userIds] = useContext(userIdContext);
    const [isUser, setIsUser] = useState(false);
    const [userData, setUserData] = useState([]);
    const classes = useStyles();
    const navigate = useNavigate();
    console.log(userIds);
    useEffect(() => {
        const subscription = AuthorizationService.isUserStatus.subscribe(setIsUser);
        return () => subscription && subscription.unsubscribe();
    }, [isUser]);

    useEffect(() => {
        DataService.getJson(ENDPOINT_URLS[GET_ALL_USER_PROFILE_DATA](userIds)).then(val => {
            const { data } = val;
            setUserData(data);
        });
    }, []);

    return (
        <>
            <div className="header-home-profile ">
                <div className="logo-for-p">
                    <Link to={'/'}><span className="back-to-home">Home</span></Link>

                </div>
                <div className="avatar-profile-all-user">
                    <Avatar sx={{
                        width: 120,
                        height: 120,
                        backgroundColor: '#0580e8'
                    }}>{'TG'}</Avatar>
                </div>
            </div>
            <div className="content-profile">
                <Grid item xs={12}>
                    <Container maxWidth="md">
                        <div className={classes.formWrapper}>
                            <Formik
                                // initialValues={{
                                //     name: userData?.name || '',
                                //     surname: userData?.surname || '',
                                //     email: userData?.email || '',
                                //     phone: userData?.phone || '',
                                //     city: userData?.city || '',
                                //     country: userData?.country || '',
                                //     university: userData?.university ||  '',
                                //     company: userData?.company || '',
                                // }}
                                onSubmit={() => {
                                }}
                            >
                                <Form>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            {userData?.name && (
                                                <TextfieldWrapperWrapper
                                                    name="name"
                                                    label="Name"
                                                    defaultValue={userData?.name}
                                                    autoComplete="on"
                                                    disabled={true}
                                                />
                                            )}
                                        </Grid>
                                        <Grid item xs={12}>
                                            {userData?.surname && (
                                                <TextfieldWrapperWrapper
                                                    name="surname"
                                                    label="Surname"
                                                    defaultValue={userData?.surname}
                                                    autoComplete="on"
                                                    disabled={true}
                                                />
                                            )}

                                        </Grid>
                                        <Grid item xs={12}>
                                            {userData?.email && (
                                                <TextfieldWrapperWrapper
                                                    name="email"
                                                    label="Email"
                                                    defaultValue={userData?.email}
                                                    autoComplete="on"
                                                    disabled={true}
                                                />
                                            )}
                                        </Grid>
                                        <Grid item xs={12}>
                                            {userData?.phone && (
                                                <TextfieldWrapperWrapper
                                                    name="phone"
                                                    label="Phone"
                                                    defaultValue={userData?.phone}
                                                    autoComplete="on"
                                                    disabled={true}
                                                />
                                            )}
                                        </Grid>
                                        <Grid item xs={12}>
                                            {userData?.city && (
                                                <TextfieldWrapperWrapper
                                                    name="city"
                                                    label="City"
                                                    defaultValue={userData?.city}
                                                    autoComplete="on"
                                                    disabled={true}
                                                />
                                            )}
                                        </Grid>
                                        <Grid item xs={12}>
                                            {userData?.country && (
                                                <TextfieldWrapperWrapper
                                                    name="country"
                                                    label="Country"
                                                    defaultValue={userData?.country}
                                                    autoComplete="on"
                                                    disabled={true}
                                                />
                                            )}
                                        </Grid>
                                        <Grid item xs={12}>
                                            {userData?.company && (
                                                <TextfieldWrapperWrapper
                                                    name="company"
                                                    label="Company"
                                                    defaultValue={userData?.company}
                                                    autoComplete="on"
                                                    disabled={true}
                                                />
                                            )}
                                        </Grid>
                                        <Grid item xs={12}>
                                            {userData?.university && (
                                                <TextfieldWrapperWrapper
                                                    name="university"
                                                    label="University"
                                                    defaultValue={userData?.university}
                                                    autoComplete="on"
                                                    disabled={true}
                                                />
                                            )}
                                        </Grid>
                                    </Grid>
                                </Form>
                            </Formik>
                        </div>
                    </Container>
                </Grid>

            </div>
            <CarouselS/>
            <div className="company-footer">
                <Footer/>
            </div>
        </>);
};

export default UserProfileWithAvatar;
