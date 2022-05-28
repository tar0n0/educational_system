import React from 'react';
import { Link } from 'react-router-dom';

import './hamburgerMenu.css';

const HamburgerMenu = () => {
    return (
        <>
            <div className="hamburger">
                <input type="checkbox" />
                <div className="hamburgerlines">
                    <span className="lines line1">

                    </span>
                    <span className="lines line2">

                    </span>
                    <span className="lines line3">

                    </span>
                </div>
                <ul className="menu-items">
                    <li>
                        <Link to={'/about'} className={'menu-links-with-navigation'}>
                            <span className="menu-items-for-header">About</span>
                        </Link>
                    </li>
                    <li><Link to={'/universities'} className={'menu-links-with-navigation'}>
                        <span className="menu-items-for-header">Universities</span>
                    </Link></li>
                    <li><Link to={'/companies'} className={'menu-links-with-navigation'}>
                        <span className="menu-items-for-header">Enterprises</span>
                    </Link></li>
                    <li><Link to={'/courses'} className={'menu-links-with-navigation'}>
                        <span className="menu-items-for-header">Courses</span>
                    </Link></li>
                    <li><Link to={'/announcements'} className={'menu-links-with-navigation'}>
                        <span className="menu-items-for-header">Announcements</span>
                    </Link></li>
                    <li><Link to={'/contacts'} className={'menu-links-with-navigation'}>
                        <span className="menu-items-for-header">Contacts</span>
                    </Link></li>
                </ul>
            </div>
        </>
    );
};

export default HamburgerMenu;
