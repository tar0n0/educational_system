import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccountMenu from '../../sharedComponents/menuWithAvatar';
import Footer from '../../sharedComponents/footer/footer';
import { useNavigate } from 'react-router-dom';
import CarouselS from '../../sharedComponents/slideShow';
import { EXTENDED_SEARCH } from '../../../constants/pathnames.constants';
import { modalContext } from '../../../context/modalContext';
import AuthorizationService from '../../../services/authorizationService';

import '../home/home.css';

const Companies = () => {
    const { setOpen } = useContext(modalContext);
    const [isUser, setIsUser] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const subscription = AuthorizationService.isUserStatus.subscribe(setIsUser);
        return () => subscription && subscription.unsubscribe();
    }, [isUser]);

    return (
        <>
            <div className="header-home">
                <div className="logo-for-p">
                    <Link to={'/'}><span className="back-to-home">Home</span></Link>
                </div>
                <div className="auth">
                    {isUser ? (<AccountMenu/>) : (
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="white"
                                className="bi bi-person-fill"
                                viewBox="0 0 16 16"
                            >
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            </svg>
                            <Link to={'/login'} className="login">
                                Login
                            </Link>
                            <span className="slash">\</span>
                            <span className="sign-up" onClick={() => setOpen(true)}>
                        SignUp
                            </span>
                        </>
                    )}
                </div>
                <div className="search">
                    <input className="search-input" placeholder="Search" autoComplete="off"/>
                    <button className="extend-search">
                        <span className="span-search" onClick={() => navigate(EXTENDED_SEARCH)}>Extended Search</span>
                    </button>
                </div>
            </div>
            <div className="content">
                <div className="list-btns">

                </div>
            </div>
            <CarouselS/>
            <div className="company-footer">
                <Footer/>
            </div>
        </>);
};

export default Companies;
