import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { USER_TYPES_FOR_MODAL } from '../../../constants/modals.constat';
import useWindowResize from '../../../hooks/useWindowResize';
import DataService from '../../../services/dataService';
import { getStorageItem } from '../../../storage';
import DataList from '../../sharedComponents/dataList';
import AccountMenu from '../../sharedComponents/menuWithAvatar';
import { useNavigate } from 'react-router-dom';
import Footer from '../../sharedComponents/footer/footer';
import { modalContext } from '../../../context/modalContext';
import AuthorizationService from '../../../services/authorizationService';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent } from "rxjs";
import { EXTENDED_SEARCH } from '../../../constants/pathnames.constants';
import { ENDPOINT_URLS, INPUT_SEARCH } from '../../../constants/api.constants';
import Img1 from "../../../components/pages/home/Slider_pict/images1.jpg";
import Img2 from "../../../components/pages/home/Slider_pict/images2.jpg";
import Img3 from "../../../components/pages/home/Slider_pict/images3.jpg";
import Img4 from "../../../components/pages/home/Slider_pict/images4.jpg";

import './home.css';

const Home = () => {
    const { setOpen, setType } = useContext(modalContext);
    const [isUser, setIsUser] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const { width } = useWindowResize();
    const ref = useRef();
    const navigate = useNavigate();
    console.log(width);
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
                        <span className="menu-items-for-header">Companies</span>
                    </Link>
                    <Link to={'/contacts'} className={'menu-links-with-navigation'}>
                        <span className="menu-items-for-header">Contacts</span>
                    </Link>
                    <Link to={'/courses'} className={'menu-links-with-navigation'}>
                        <span className="menu-items-for-header">Courses</span>
                    </Link>
                    <Link to={'/announcements'} className={'menu-links-with-navigation'}>
                        <span className="menu-items-for-header">Announcements</span>
                    </Link>
                </div>
                <div className="auth">
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
                <div className="search">
                    <input className="search-input" placeholder="Search" autoComplete="off" ref={ref}/>
                    <button className="extend-search" onClick={() => {
                        if (getStorageItem('user')?.token) {
                            navigate(EXTENDED_SEARCH);
                        } else {
                            toast.info('Extended search can only be done by registered users', {
                                type: toast.TYPE.INFO,
                                icon: true,
                                theme: 'dark'
                            });
                        }
                    }}>
                        <span className="span-search">Extended Search</span>
                    </button>
                </div>
            </div>
            {searchData.length ? (
                <div className="content">
                    <DataList data={searchData} title="Search Data"/>
                </div>
            ) : (
                <div className="content-home-page">
                    <div className="container_slider_css">
                        <img className="photo_slider_css" src={Img1}/>
                        <img className="photo_slider_css" src={Img2}/>
                        <img className="photo_slider_css" src={Img3}/>
                        <img className="photo_slider_css" src={Img4}/>
                    </div>

                </div>
            )}
            <div className="home-footer">
                <Footer/>
            </div>
        </>
    );
};

export default Home;
