import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountMenu from '../../../sharedComponents/menuWithAvatar';
import { CONTENT_TYPE, MATERIALS_TYPE, USER_TYPE } from '../../../../constants/ui.constants';
import '../style.css';
import UserForm from '../../../auth/pieces/formsForUserTypes/userForm';
import Footer from '../../../sharedComponents/footer/footer';
import ConfirmProfile from '../confirmProfile';
import Materials from '../materials';

import '../../../headerActions/header.css';

const UniversityPage = () => {
    const [clickType, setClickType] = useState('');
    const [clickMaterialTYpe, setClickMaterialType] = useState('');
    const { MATERIALS, PROFILE, CONFIRM_USER } = CONTENT_TYPE;
    const { UPLOAD_FILE, MY_FILES } = MATERIALS_TYPE;
    const handleClick = (type = '') => setClickType(type);

    return (<>
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
            {clickType && clickType === PROFILE ? (<>
                <UserForm isAllContent={true} inUniversity={true} editUserInfo={{
                    name: USER_TYPE?.UNIVERSITY, isEdit: true,
                }}
                setClickType={setClickType}
                />
            </>) : clickType && clickType === MATERIALS ? (<>
                <div className="materials-btn">
                    <button
                        className={clickMaterialTYpe && clickMaterialTYpe === UPLOAD_FILE ? 'active-material-btn' : 'material-btn'}
                        onClick={() => setClickMaterialType(UPLOAD_FILE)}
                        disabled={clickMaterialTYpe === UPLOAD_FILE}
                    >
                        Upload File
                    </button>
                    <button
                        className={clickMaterialTYpe && clickMaterialTYpe === MY_FILES ? 'active-material-btn' : 'material-btn'}
                        onClick={() => setClickMaterialType(MY_FILES)}
                        disabled={clickMaterialTYpe === MY_FILES}
                    >
                        My Files
                    </button>
                </div>
                {/*<Materials/>*/}
            </>) : clickType && clickType === CONFIRM_USER ? (<><ConfirmProfile/></>) : null}
        </div>
        <div className="material-content">
            {clickMaterialTYpe && clickMaterialTYpe === UPLOAD_FILE && clickType === MATERIALS ? (
                <Materials/>
            ) : (clickMaterialTYpe && clickMaterialTYpe === MY_FILES && clickType === MATERIALS) ? <>Materials</> : null}
        </div>
        <div className={'footer-for-page'}>
            <Footer/>
        </div>
    </>);
};

export default UniversityPage;
