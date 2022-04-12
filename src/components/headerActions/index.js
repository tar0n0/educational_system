import React, { useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './header.css';

const Header = (name, isLogin) => {
    const type = useLocation().pathname.replaceAll('/', '').replaceAll('sign-up', '').toUpperCase();

    useLayoutEffect(() => {

    }, []);

    return (
        <div className="header">
            <div className="logo-for-p">
                <Link to={'/'}><span className="back-to-home">Home</span></Link>
            </div>
            <span className="context">{!isLogin ? (typeof name === 'object' && Object.keys(name).length) || (typeof name !== 'object' && name) ? 'Extended Search' : `Create Account For ${type}` : 'Login'}</span>
        </div>
    );
};

export default Header;
