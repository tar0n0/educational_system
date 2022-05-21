import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckIcon from '@mui/icons-material/Check';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SchoolIcon from '@mui/icons-material/School';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MyFiles from '../../../myFiles';
import AccountMenu from '../../../sharedComponents/menuWithAvatar';
import UserForm from '../../../auth/pieces/formsForUserTypes/userForm';
import { CONTENT_TYPE, MATERIALS_TYPE, rightSideItemsName, USER_TYPE } from '../../../../constants/ui.constants';

import '../style.css';
import Footer from '../../../sharedComponents/footer/footer';
import Materials from '../materials';
import SelectedMenuContent from '../university/selectedMenuContent';

const UserPage = () => {
    const [clickType, setClickType] = useState('');
    const [clickMaterialTYpe, setClickMaterialType] = useState('');
    const { MATERIALS, PROFILE } = CONTENT_TYPE;
    const [selectedItem, setSelectedItem] = useState('');
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
            <div className="sub-routing-for-side-for-university">
                <div className="container-side">
                    <ul className="list-for-side-for-university">
                        <li className={`item-for-side ${selectedItem === rightSideItemsName.PROFILE ? 'active' : ''}`}
                            onClick={() => setSelectedItem(rightSideItemsName.PROFILE)}>
                            <div>
                                <AccountCircleIcon color={"inherit"} sx={{
                                    width: 32,
                                    height: 32
                                }}/>
                                Profile
                            </div>
                        </li>
                        <li className={`item-for-side ${selectedItem === rightSideItemsName.MATERIALS ? 'active' : ''}`}
                            onClick={() => setSelectedItem(rightSideItemsName.MATERIALS)}>
                            <span>
                                <LibraryBooksIcon color={"inherit"} sx={{
                                    width: 32,
                                    height: 32
                                }}/>

                            </span>
                            <span>Materials</span>

                        </li>
                        <li className={`item-for-side ${selectedItem === rightSideItemsName.ANNOUNCEMENTS ? 'active' : ''}`}
                            onClick={() => setSelectedItem(rightSideItemsName.ANNOUNCEMENTS)}>
                            <span>

                            </span>
                            <span>Announcements</span>
                        </li>
                        <li className={`item-for-side ${selectedItem === rightSideItemsName.NEWS ? 'active' : ''}`}
                            onClick={() => setSelectedItem(rightSideItemsName.NEWS)}>
                            <NewspaperIcon color={"inherit"} sx={{
                                width: 32,
                                height: 32
                            }}/>
                            News
                        </li>
                        <li className={`item-for-side ${selectedItem === rightSideItemsName.COURSES ? 'active' : ''}`}
                            onClick={() => setSelectedItem(rightSideItemsName.COURSES)}>
                            <SchoolIcon color={"inherit"} sx={{
                                width: 32,
                                height: 32
                            }}/>
                            Courses
                        </li>
                        <li className={`item-for-side-fake ${selectedItem === rightSideItemsName.COURSES ? 'active' : ''}`}></li>
                        <li className={`item-for-side-fake  ${selectedItem === rightSideItemsName.COURSES ? 'active' : ''}`}></li>
                        <li className={`item-for-side-fake  ${selectedItem === rightSideItemsName.COURSES ? 'active' : ''}`}></li>
                        <li className={`item-for-side-fake  ${selectedItem === rightSideItemsName.COURSES ? 'active' : ''}`}></li>
                        <li className={`item-for-side-fake  ${selectedItem === rightSideItemsName.COURSES ? 'active' : ''}`}></li>
                        <li className={`item-for-side-fake  ${selectedItem === rightSideItemsName.COURSES ? 'active' : ''}`}></li>
                        <li className={`item-for-side-fake  ${selectedItem === rightSideItemsName.COURSES ? 'active' : ''}`}></li>
                        <li className={`item-for-side-fake  ${selectedItem === rightSideItemsName.COURSES ? 'active' : ''}`}></li>
                        <li className={`item-for-side-fake  ${selectedItem === rightSideItemsName.COURSES ? 'active' : ''}`}></li>
                        <li className={`item-for-side-fake  ${selectedItem === rightSideItemsName.COURSES ? 'active' : ''}`}></li>

                    </ul>
                </div>
                <div className="second-block-for-right-side-menu">
                    {/*type = '', setClickType, clickMaterialTYpe, setClickMaterialType, clickType*/}
                    <SelectedMenuContent type={selectedItem} setClickType={setClickType}
                        setClickMaterialType={setClickMaterialType}
                        clickMaterialTYpe={clickMaterialTYpe} clickType={clickType}/>
                </div>
            </div>
            <div className={!clickType || clickType === MATERIALS ? 'footer-for-page' : ''}>
                <Footer/>
            </div>
        </>
    );
};

export default UserPage;
