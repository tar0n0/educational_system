import { toast } from 'react-toastify';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ENDPOINT_URLS, INPUT_SEARCH } from '../../../constants/api.constants';
import { EXTENDED_SEARCH } from '../../../constants/pathnames.constants';
import DataService from '../../../services/dataService';
import { getStorageItem } from '../../../storage';
import EventAnimationSVG from '../../sharedComponents/animationSVG';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DataList from '../../sharedComponents/dataList';
import AccountMenu from '../../sharedComponents/menuWithAvatar';
import Footer from '../../sharedComponents/footer/footer';
import CarouselS from '../../sharedComponents/slideShow';
import { modalContext } from '../../../context/modalContext';
import AuthorizationService from '../../../services/authorizationService';

import '../home/home.css';
import './contact.css';

const Contact = () => {
    const { setOpen } = useContext(modalContext);
    const [isUser, setIsUser] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const ref = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const subscription = AuthorizationService.isUserStatus.subscribe(setIsUser);
        return () => subscription && subscription.unsubscribe();
    }, [isUser]);

    useEffect(() => {
        const getData = fromEvent(ref.current, "input").pipe(
            map(e => e.target.value),
            debounceTime(300),
            distinctUntilChanged(),
        ).subscribe(val => {
            setInputValue(val);
            DataService.getJson(ENDPOINT_URLS[INPUT_SEARCH], { input: val }).then(res => {
                const { data } = res;
                setSearchData(data);
            }).catch(_ => setSearchData([]));
        });

        return () => {
            getData.unsubscribe();
        };
    }, []);


    return (
        <>
            <div className="header-home">
                <div className="logo-for-p">
                    <Link to={'/'}><span className="back-to-home">Home</span></Link>
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
                <div className="auth">
                    {isUser ? (<AccountMenu/>) : (
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
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
                            <span className="sign-up" onClick={() => setOpen(true)}>
                        SignUp
                            </span>
                        </>
                    )}
                </div>
                <div className="search">
                    <input className="search-input" placeholder="Search" autoComplete="off" ref={ref}/>
                    <button className="extend-search">
                        <span className="span-search" onClick={() => {
                            if (getStorageItem('user')?.token) {
                                navigate(EXTENDED_SEARCH);
                            } else {
                                toast.info('Extended search can only be done by registered users', {
                                    type: toast.TYPE.INFO,
                                    icon: true,
                                    theme: 'dark'
                                });
                            }
                        }}>Extended Search</span>
                    </button>
                </div>
            </div>
            <div className="content">
                {searchData?.length ? (
                    <>
                        <div className="content">
                            <DataList data={searchData} title="Search Data"/>
                        </div>
                    </>
                ) : (
                    <>

                        <div className="profile-wrapper">
                            <div className="profile-details">
                                <div>
                                    <div className="profile-title">
                                        <h1 id="profile-name" className="profile-name">Polytech Team</h1>
                                    </div>
                                    <ul>
                                        <li className="profile-number">
                                            <div>Name</div>
                                            <div id="profile-first-number">Polytechnic</div>
                                        </li>
                                        <li className="profile-number">
                                            <div>Address</div>
                                            <div id="profile-second-number">Armenia, Yerevan, Teryan 105, 0009</div>
                                        </li>
                                        <li className="profile-email">
                                            <div> Email</div>
                                            <div id="profile-primary-email">info@polytechnic.am</div>
                                        </li>
                                        <li className="profile-email">
                                            <div>Phone </div>
                                            <div id="profile-secondary-email">+374 10 56 79 68</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="contact-action">

                        </div>
                    </>
                )}
            </div>
            <CarouselS/>
            <div className="contact-footer">
                <Footer/>
            </div>

        </>);
};

export default Contact;
