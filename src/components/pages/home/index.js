import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { USER_TYPES_FOR_MODAL } from '../../../constants/modals.constat';
import DataService from '../../../services/dataService';
import MyFiles from '../../myFiles';
import AccountMenu from '../../sharedComponents/menuWithAvatar';
import { useNavigate } from 'react-router-dom';
import Footer from '../../sharedComponents/footer/footer';
import { modalContext } from '../../../context/modalContext';
import AuthorizationService from '../../../services/authorizationService';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent } from "rxjs";
import { EXTENDED_SEARCH } from '../../../constants/pathnames.constants';
import { ENDPOINT_URLS, INPUT_SEARCH } from '../../../constants/api.constants';

import './home.css';

const Home = () => {
    const { setOpen, setType } = useContext(modalContext);
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
                console.log(data);
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
                    <button className="extend-search" onClick={() => navigate(EXTENDED_SEARCH)}>
                        <span className="span-search">Extended Search</span>
                    </button>
                </div>
            </div>
            {searchData.length ? (
                <div className="content">
                    <MyFiles
                        isSearch={true}
                        searchData={searchData}
                        val={inputValue}
                    />
                </div>
            ) : (
                <div className="content">
                    <h1 className="main-title">Home</h1>
                    <div className="list-btns">
                        <Link to={'/about'}>
                            <button className="main-btn">About</button>
                        </Link>
                        <Link to={'/universities'}>
                            <button className="main-btn">Universities</button>
                        </Link>
                        <Link to={'/companies'}>
                            <button className="main-btn">Companies</button>
                        </Link>
                        <Link to={'/contacts'}>
                            <button className="main-btn">Contacts</button>
                        </Link>
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
