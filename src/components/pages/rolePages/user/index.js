import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountMenu from '../../../sharedComponents/menuWithAvatar';
import UserForm from '../../../auth/pieces/formsForUserTypes/userForm';
import { CONTENT_TYPE } from '../../../../constants/ui.constants';

import '../style.css';
import Footer from '../../../sharedComponents/footer/footer';
import Materials from '../materials';

const UserPage = () => {
    const [clickType, setClickType] = useState('');
    const { MATERIALS, PROFILE } = CONTENT_TYPE;
    const handleClick = (type = '') => setClickType(type);

    return (
        <>
            <div className="header-user">
                <div className="logo-for-p-user">
                    <Link to={'/'}><span className="back-to-home-user">Home</span></Link>
                </div>
                <div className="context-user">Users's Page</div>
                <div className="avatar">
                    <AccountMenu/>
                </div>
            </div>
            <div className="profils-btns">
                <button
                    className={clickType && clickType === PROFILE ? 'active-profile-btn' : 'profile-btn'}
                    onClick={() => handleClick(PROFILE)}
                    disabled={clickType === PROFILE}>
                    Profile
                </button>
                <button
                    className={clickType && clickType === MATERIALS ? 'active-profile-btn' : 'profile-btn'}
                    onClick={() => handleClick(MATERIALS)}
                    disabled={clickType === MATERIALS}>
                    Materials
                </button>
            </div>
            <div className="btn-click-content">
                {clickType && clickType === PROFILE ? (
                    <>
                        <UserForm isAllContent={false}/>
                    </>
                ) : clickType && clickType === MATERIALS ? (
                    <>
                        <Materials/>
                    </>
                ) : null}
            </div>
            <div className={!clickType || clickType === MATERIALS ? 'footer-for-page' : ''}>
                <Footer/>
            </div>
        </>
    );
};

export default UserPage;
