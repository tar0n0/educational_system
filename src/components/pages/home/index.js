import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccountMenu from '../../sharedComponents/menuWithAvatar';
import Footer from '../../sharedComponents/footer/footer';
import CarouselS from '../../sharedComponents/slideShow';
import { modalContext } from '../../../context/modalContext';
import AuthorizationService from '../../../services/authorizationService';

import './home.css';

const Home = () => {
    const [, setOpen] = useContext(modalContext);
    const [isUser, setIsUser] = useState(false);

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
                            <span className="sign-up" onClick={() => setOpen(true)}>
                        SignUp
                            </span>
                        </>
                    )}
                </div>
                <div className="search">
                    <input className="search-input" placeholder="Search" autoComplete="off"/>
                    <button className="extend-search">
                        <span className="span-search">Extended Search</span>
                    </button>
                </div>
            </div>
            <div className="content">
                <h1 className="main-title">Home</h1>
                <div className="list-btns">
                    <Link to={'/about'}>
                        <button className="main-btn">About</button>
                    </Link>
                    <Link to={'/universities'}>
                        <button className="main-btn">Universities</button>
                    </Link>
                    <Link to={'/companies'}>
                        <button className="main-btn">Companies</button>
                    </Link>
                    <Link to={'/contacts'}>
                        <button className="main-btn">Contacts</button>
                    </Link>
                </div>
            </div>
            <CarouselS/>
            <Footer/>
        </>
    );
};

export default Home;
