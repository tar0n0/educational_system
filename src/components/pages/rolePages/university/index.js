import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountMenu from '../../../sharedComponents/menuWithAvatar';
// import UniversityForm from '../../../auth/pieces/formsForUserTypes/universityForm';
import { CONTENT_TYPE } from '../../../../constants/ui.constants';
import '../style.css';
import UserForm from '../../../auth/pieces/formsForUserTypes/userForm';
import Footer from '../../../sharedComponents/footer/footer';
import ConfirmProfile from '../confirmProfile';
import Materials from '../materials';

import '../../../headerActions/header.css';

const UniversityPage = () => {
    const [clickType, setClickType] = useState('');
    const { MATERIALS, PROFILE, CONFIRM_USER } = CONTENT_TYPE;
    const handleClick = (type = '') => setClickType(type);
    return (
        <>
            <div className="header-university">
                <div className="profile-context">
                    <div className="logo-for-p-university">
                        <Link to={'/'}><span className="back-to-home-university">Home</span></Link>
                    </div>
                    <div className="context-university">University Page</div>
                </div>
                <div className="avatar">
                    <AccountMenu/>
                </div>
            </div>
            <div className="profils-btns">
                <button
                    className={clickType && clickType === CONFIRM_USER ? 'active-profile-btn' : 'profile-btn'}
                    onClick={() => handleClick(CONFIRM_USER)}
                    disabled={clickType === CONFIRM_USER}>
                    Confirm Users
                </button>
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
                        <UserForm isAllContent={true} inUniversity={true}/>
                    </>
                ) : clickType && clickType === MATERIALS ? (
                    <>
                        <Materials/>
                    </>
                ) : clickType && clickType === CONFIRM_USER ? (
                    <><ConfirmProfile/></>
                ) : null}
            </div>
            <div className={!clickType || clickType === MATERIALS ? 'footer-for-page' : ''}>
                <Footer/>
            </div>
        </>
    );
};

export default UniversityPage;
