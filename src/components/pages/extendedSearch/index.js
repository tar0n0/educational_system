import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { USER_TYPES_FOR_MODAL } from '../../../constants/modals.constat';
import { modalContext } from '../../../context/modalContext';
import AuthorizationService from '../../../services/authorizationService';
import AccountMenu from '../../sharedComponents/menuWithAvatar';

const ExtendedSearch = () => {
    const { setOpen, setType } = useContext(modalContext);
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
            <div className="content">
                <h1 className="main-title">Extended Search</h1>
            </div>
        </>
    );
};

export default ExtendedSearch;
