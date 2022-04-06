import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MyFiles from '../../../myFiles';
import AccountMenu from '../../../sharedComponents/menuWithAvatar';
import UserForm from '../../../auth/pieces/formsForUserTypes/userForm';
import { CONTENT_TYPE, MATERIALS_TYPE, USER_TYPE } from '../../../../constants/ui.constants';

import '../style.css';
import Footer from '../../../sharedComponents/footer/footer';
import Materials from '../materials';

const UserPage = () => {
    const [clickType, setClickType] = useState('');
    const [clickMaterialTYpe, setClickMaterialType] = useState('');
    const { MATERIALS, PROFILE } = CONTENT_TYPE;
    const { UPLOAD_FILE, MY_FILES } = MATERIALS_TYPE;
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
                        <UserForm isAllContent={false} setClickType={setClickType} editUserInfo={{
                            name: USER_TYPE.USER,
                            isEdit: true,
                        }}/>
                    </>
                ) : clickType && clickType === MATERIALS ? (
                    <>
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
                    </>
                ) : null}
                <div className="material-content">
                    {clickMaterialTYpe && clickMaterialTYpe === UPLOAD_FILE && clickType === MATERIALS ? (
                        <Materials/>
                    ) : (clickMaterialTYpe && clickMaterialTYpe === MY_FILES && clickType === MATERIALS) ? <>
                        <MyFiles/></> : null}
                </div>
            </div>
            <div className={!clickType || clickType === MATERIALS ? 'footer-for-page' : ''}>
                <Footer/>
            </div>
        </>
    );
};

export default UserPage;
