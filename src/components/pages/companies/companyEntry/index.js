import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { USER_TYPES_FOR_MODAL } from '../../../../constants/modals.constat';
import { modalContext } from '../../../../context/modalContext';
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
    const { setOpen, setType } = useContext(modalContext);
    const [isUser, setIsUser] = useState(false);

    return (
        <>
            <div className="header-user">
                <div className="logo-for-p-user">
                    <Link to={'/'}><span className="back-to-home-user">Home</span></Link>
                </div>
                <div className="context-user">Enterprise Name</div>
                <div className="avatar">
                    {isUser ? (<AccountMenu/>) : (
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
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
