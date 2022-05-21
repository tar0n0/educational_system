import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../../sharedComponents/footer/footer';
import AccountMenu from '../../../sharedComponents/menuWithAvatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SchoolIcon from '@mui/icons-material/School';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { rightSideItemsName } from '../../../../constants/ui.constants';

import '../../universities/universityEntry/rightSideMenu.css';

const CompanyEntry = () => {
    const [selectedItem, setSelectedItem] = useState('');
    return (
        <>
            <div className="header-user">
                <div className="logo-for-p-user">
                    <Link to={'/'}><span className="back-to-home-user">Home</span></Link>
                </div>
                <div className="context-user">Enterprise Name</div>
                <div className="avatar">
                    <AccountMenu/>
                </div>
            </div>
            <div className="sub-routing-for-side">
                <div className="container-side">
                    <ul className="list-for-side">
                        <li className={`item-for-side ${selectedItem === rightSideItemsName.PROFILE ? 'active' : ''}`}
                            onClick={() => setSelectedItem(rightSideItemsName.PROFILE)}>
                            <div>
                                <AccountCircleIcon color={"info"} sx={{
                                    width: 32,
                                    height: 32
                                }}/>
                                Profile
                            </div>
                        </li>
                        <li className={`item-for-side ${selectedItem === rightSideItemsName.MATERIALS ? 'active' : ''}`}
                            onClick={() => setSelectedItem(rightSideItemsName.MATERIALS)}>
                            <span>
                                <LibraryBooksIcon color={"info"} sx={{
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
                            <NewspaperIcon color={"info"} sx={{
                                width: 32,
                                height: 32
                            }}/>
                            News
                        </li>
                        <li className={`item-for-side ${selectedItem === rightSideItemsName.COURSES ? 'active' : ''}`}
                            onClick={() => setSelectedItem(rightSideItemsName.COURSES)}>
                            <SchoolIcon color={"info"} sx={{
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
                <div>
                    <h1 className="sub-title-for-side">Enterprise Public Page</h1>
                </div>
            </div>
            <div className="home-footer">
                <Footer/>
            </div>
        </>
    );
};

export default CompanyEntry;
