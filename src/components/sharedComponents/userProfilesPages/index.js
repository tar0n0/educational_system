// import Avatar from '@mui/material/Avatar';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { userIdContext } from '../../../context/userIdContext';
import Footer from '../../sharedComponents/footer/footer';
// import { useNavigate } from 'react-router-dom';
import CarouselS from '../../sharedComponents/slideShow';
import AuthorizationService from '../../../services/authorizationService';
// import { makeStyles } from "@material-ui/core/styles";
import DataService from '../../../services/dataService';
import { ENDPOINT_URLS, GET_ALL_USER_PROFILE_DATA } from '../../../constants/api.constants';
// import { getStorageItem } from '../../../storage';

import './user..css';
// import UserCard from '../userCard';

// const useStyles = makeStyles(theme => ({
//     pageTitle: {
//         display: "block",
//         margin: "16px 0px 32px 0px",
//         width: "100%",
//         justifyContent: "center",
//         color: "#194d94",
//         fontFamily: "sans-serif",
//         fontWeight: "normal",
//         fontStyle: "italic",
//         fontSize: "55px",
//         marginTop: "20px",
//         textAlign: "center",
//     },
//     cardsLayout: {
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//         gridGap: "30px",
//         maxWidth: "900px",
//         margin: "0 auto 20px"
//     },
//     cardsLayoutItem: {
//         position: "relative"
//     }
// }));

const UserProfileWithAvatar = ({ data }) => {
    const [userIds] = useContext(userIdContext);
    const [isUser, setIsUser] = useState(false);
    const [userData, setUserData] = useState([]);
    // const classes = useStyles();
    // const navigate = useNavigate();

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
                    <span className="context">User Profile Info</span>
                </div>
            </div>
            <div className="content-profile">
                <div className="page-content page-container" id="page-content">
                    <div className="padding">
                        <div className="row container d-flex justify-content-center">
                            <div className="col-xl-6 col-md-12">
                                <div className="card user-card-full">
                                    <div className="row m-l-0 m-r-0">
                                        <div className="col-sm-4 bg-c-lite-green user-profile">
                                            <div className="card-block text-center text-white">
                                                <div className="m-b-25" ><img
                                                    src="https://img.icons8.com/bubbles/100/000000/user.png"
                                                    className="img-radius" alt="User Profile Image"/></div>
                                                <h6 className="f-w-600">{`${userData?.name} ${userData?.surname || ''}`}</h6>
                                                <p>User</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-8">
                                            <div className="card-block">
                                                <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Email</p>
                                                        <h6 className="text-muted f-w-400">{userData?.email}</h6>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Phone</p>
                                                        <h6 className="text-muted f-w-400">{userData?.phone}</h6>
                                                    </div>
                                                </div>
                                                <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Others</h6>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        {userData?.city && (
                                                            <>
                                                                <p className="m-b-10 f-w-600">City</p>
                                                                <h6 className="text-muted f-w-400">{userData?.city}</h6>
                                                            </>
                                                        )}
                                                    </div>
                                                    {userData?.country && (
                                                        <>
                                                            <div className="col-sm-6">
                                                                <p className="m-b-10 f-w-600">Country</p>
                                                                <h6 className="text-muted f-w-400">{userData?.country}</h6>
                                                            </div>
                                                        </>
                                                    )}
                                                    {userData?.company && (
                                                        <>
                                                            <div className="col-sm-6">
                                                                <p className="m-b-10 f-w-600">Company</p>
                                                                <h6 className="text-muted f-w-400">{userData?.company}</h6>
                                                            </div>
                                                        </>
                                                    )}
                                                    {userData?.university && (
                                                        <>
                                                            <div className="col-sm-6">
                                                                <p className="m-b-10 f-w-600">University</p>
                                                                <h6 className="text-muted f-w-400">{userData?.university}</h6>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                                <ul className="social-link list-unstyled m-t-40 m-b-10">
                                                    <li><a href="#!" data-toggle="tooltip" data-placement="bottom"
                                                        title=""
                                                        data-original-title="facebook" data-abc="true"></a></li>
                                                    <li><a href="#!" data-toggle="tooltip" data-placement="bottom"
                                                        title=""
                                                        data-original-title="twitter" data-abc="true"></a></li>
                                                    <li><a href="#!" data-toggle="tooltip" data-placement="bottom"
                                                        title=""
                                                        data-original-title="instagram" data-abc="true"></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
