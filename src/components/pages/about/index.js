import { toast } from 'react-toastify';
import { USER_TYPES_FOR_MODAL } from '../../../constants/modals.constat';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EXTENDED_SEARCH } from '../../../constants/pathnames.constants';
import { getStorageItem } from '../../../storage';
import AccountMenu from '../../sharedComponents/menuWithAvatar';
import Footer from '../../sharedComponents/footer/footer';
import CarouselS from '../../sharedComponents/slideShow';
import { modalContext } from '../../../context/modalContext';
import AuthorizationService from '../../../services/authorizationService';

import '../home/home.css';

const About = () => {
    const { setOpen, setType } = useContext(modalContext);
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
                                setOpen(true);
                                setType(USER_TYPES_FOR_MODAL);
                            }}>
                        SignUp
                            </span>
                        </>
                    )}
                </div>
                <div className="search">
                    <input className="search-input" placeholder="Search" autoComplete="off"/>
                    <button className="extend-search">
                        <span className="span-search" onClick={() => {
                            if (getStorageItem('user')?.token) {
                                navigate(EXTENDED_SEARCH);
                            } else {
                                toast.info('Extended search can only be done by registered users', {
                                    type: toast.TYPE.INFO,
                                    icon: true,
                                    theme: 'dark'
                                });
                            }
                        }}>Extended Search</span>
                    </button>
                </div>
            </div>
            <div className="content">
                <div className="list-btns">
                    <h1 className='h1-about'>The platform was developed by the NPUA team.</h1>
                    <p className='text-for-about'>
                        Through online Platform, TACEESM project opens up enormous possibilities for partner countries
                        to become part of European network of education and industry, and brings new capabilities of
                        colaboration through virtual space.
                        Through dynamic, up to date, and innovative activities partner institutions will collaborate
                        with local community, industry and international partners through virtual inviroment.</p>
                </div>
            </div>
            <CarouselS/>
            <div className="about-footer">
                <Footer/>
            </div>
        </>
    );
};

export default About;
