import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SchoolIcon from '@mui/icons-material/School';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountMenu from '../../../sharedComponents/menuWithAvatar';
import { CONTENT_TYPE, MATERIALS_TYPE, rightSideItemsName, USER_TYPE } from '../../../../constants/ui.constants';
import CheckIcon from '@mui/icons-material/Check';
import '../style.css';
import Footer from '../../../sharedComponents/footer/footer';

import '../../../headerActions/header.css';
import SelectedMenuContent from './selectedMenuContent';

const UniversityPage = () => {
    const [clickType, setClickType] = useState('');
    const [clickMaterialTYpe, setClickMaterialType] = useState('');
    const [selectedItem, setSelectedItem] = useState('');
    const { MATERIALS, PROFILE, CONFIRM_USER } = CONTENT_TYPE;
    const { UPLOAD_FILE, MY_FILES } = MATERIALS_TYPE;
    const handleClick = (type = '') => setClickType(type);

    return (<>
        <div className="header-university">
            <div className="profile-context">
                <div className="logo-for-p-university">
                    <Link to={'/'}><span className="back-to-home-university">Home</span></Link>
                </div>
                <div className="context-university">
                    <Link to={'/about'} className={'menu-links-with-navigation'}>
                        <span className="menu-items-for-header">About</span>
                    </Link>
                    <Link to={'/universities'} className={'menu-links-with-navigation'}>
                        <span className="menu-items-for-header">Universities</span>
                    </Link>
                    <Link to={'/companies'} className={'menu-links-with-navigation'}>
                        <span className="menu-items-for-header">Enterprises</span>
                    </Link>
                    <Link to={'/courses'} className={'menu-links-with-navigation'}>
                        <span className="menu-items-for-header">Courses</span>
                    </Link>
                    <Link to={'/announcements'} className={'menu-links-with-navigation'}>
                        <span className="menu-items-for-header">Announcements</span>
                    </Link>
                    <Link to={'/contacts'} className={'menu-links-with-navigation'}>
                        <span className="menu-items-for-header">Contacts</span>
                    </Link>
                </div>
            </div>
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
                    <li className={`item-for-side ${selectedItem === rightSideItemsName.CONFIRM_MEMBER ? 'active' : ''}`}
                        onClick={() => setSelectedItem(rightSideItemsName.CONFIRM_MEMBER)}>
                        <CheckIcon color={"inherit"} sx={{
                            width: 32,
                            height: 32
                        }}/>
                        <span>Confirm member</span>
                    </li>
                    <li className={`item-for-side ${selectedItem === rightSideItemsName.CONFIRM_PROFILE ? 'active' : ''}`}
                        onClick={() => setSelectedItem(rightSideItemsName.CONFIRM_PROFILE)}>
                        <CheckIcon color={"inherit"} sx={{
                            width: 32,
                            height: 32
                        }}/>
                        <span>Confirm Users</span>
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
                <SelectedMenuContent type={selectedItem} setClickType={setClickType}
                    setClickMaterialType={setClickMaterialType}
                    clickMaterialTYpe={clickMaterialTYpe} clickType={clickType}/>
            </div>
        </div>
        <div className={''}>
            <Footer/>
        </div>
    </>);
};

export default UniversityPage;
