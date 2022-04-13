import Avatar from '@mui/material/Avatar';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { userIdContext } from '../../../context/userIdContext';
import Footer from '../../sharedComponents/footer/footer';
import { useNavigate } from 'react-router-dom';
import CarouselS from '../../sharedComponents/slideShow';
import AuthorizationService from '../../../services/authorizationService';
import { makeStyles } from "@material-ui/core/styles";
import DataService from '../../../services/dataService';
import { ENDPOINT_URLS, GET_ALL_USER_PROFILE_DATA } from '../../../constants/api.constants';
import { getStorageItem } from '../../../storage';

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
                    }}>{localStorage.getItem('avatar')}</Avatar>
                </div>
            </div>
            <div className="content-profile">
                <div className="main">
                    <h2>Profile Info</h2>
                    <div className="card">
                        <div className="card-body">
                            <i className="fa fa-pen fa-xs edit"></i>
                            <table>
                                <tbody>
                                    {userData?.name && (
                                        <tr>
                                            <td>Name</td>
                                            <td>:</td>
                                            <td>{userData?.name}</td>
                                        </tr>
                                    )}
                                    {userData?.surname && (
                                        <tr>
                                            <td>Surname</td>
                                            <td>:</td>
                                            <td>{userData?.surname}</td>
                                        </tr>

                                    )}
                                    {userData?.phone && (
                                        <tr>
                                            <td>Phone</td>
                                            <td>:</td>
                                            <td>{userData?.phone}</td>
                                        </tr>
                                    )}
                                    {userData?.link && (
                                        <tr>
                                            <td>Link</td>
                                            <td>:</td>
                                            <td>{userData?.link}</td>
                                        </tr>
                                    )}
                                    {userData?.city && (
                                        <tr>
                                            <td>City</td>
                                            <td>:</td>
                                            <td>{userData?.city}</td>
                                        </tr>
                                    )}
                                    {userData?.country && (
                                        <tr>
                                            <td>Country</td>
                                            <td>:</td>
                                            <td>{userData?.country}</td>
                                        </tr>
                                    )}
                                    {userData?.email && (
                                        <tr>
                                            <td>Email</td>
                                            <td>:</td>
                                            <td>{userData?.email}</td>
                                        </tr>
                                    )}
                                    {userData?.company && (
                                        <tr>
                                            <td>Company</td>
                                            <td>:</td>
                                            <td>{userData?.company}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <CarouselS/>
            <div className="company-footer">
                <Footer/>
            </div>
        </>);
};

export default UserProfileWithAvatar;
