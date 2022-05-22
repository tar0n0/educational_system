import Typography from '@material-ui/core/Typography';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ENDPOINT_URLS, GET_ALL_UNIVERSITIES, INPUT_SEARCH } from '../../../constants/api.constants';
import { USER_TYPES_FOR_MODAL } from '../../../constants/modals.constat';
import { EXTENDED_SEARCH } from '../../../constants/pathnames.constants';
import DataService from '../../../services/dataService';
import { getStorageItem } from '../../../storage';
import DataList from '../../sharedComponents/dataList';
import ListWithLogo from '../../sharedComponents/listWithLogo';
import AccountMenu from '../../sharedComponents/menuWithAvatar';
import Footer from '../../sharedComponents/footer/footer';
import CarouselS from '../../sharedComponents/slideShow';
import { modalContext } from '../../../context/modalContext';
import AuthorizationService from '../../../services/authorizationService';
import { makeStyles } from "@material-ui/core/styles";

import '../home/home.css';

const useStyles = makeStyles(theme => ({
    pageTitle: {
        display: "block",
        margin: "16px 0px 32px 0px",
        width: "100%",
        justifyContent: "center",
        // textAlign: "center",
        color: "#ffffff",
        fontFamily: "sans-serif",
        fontWeight: "normal",
        fontStyle: "italic",
        fontSize: "55px",
        marginTop: "20px",
        textAlign: "center",
    },
    cardsLayout: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gridGap: "30px",
        maxWidth: "900px",
        margin: "0 auto 20px"
    },
    cardsLayoutItem: {
        position: "relative"
    }
}));


const Universities = () => {
    const { setOpen, setType } = useContext(modalContext);
    const [isUser, setIsUser] = useState(false);
    const [universities, setUniversities] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const ref = useRef();
    const navigate = useNavigate();
    const classes = useStyles();

    useEffect(() => {
        const subscription = AuthorizationService.isUserStatus.subscribe(setIsUser);
        return () => subscription && subscription.unsubscribe();
    }, [isUser]);

    useEffect(() => {
        setIsLoading(true);
        DataService.getJson(ENDPOINT_URLS[GET_ALL_UNIVERSITIES]).then(val => {
            const { data } = val;
            const currentData = data.map(el => {
                return {
                    title: el?.universityName,
                    url: el?.universityLink || '',
                };
            });
            setUniversities(_ => currentData);
        }).finally(() => setIsLoading(false));
    }, []);

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
                    <Link to={'/contacts'} className={'menu-links-with-navigation'}>
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
            <div className="content-for-universities">
                {searchData?.length ? (
                    <>
                        <div className="content">
                            <DataList data={searchData} title="Search Data"/>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="container-for-list-universities">
                            <section className={classes.pageTitle}>
                                <Typography variant="h4">Universities</Typography>
                            </section>
                            <>
                                {universities.map((card, index) => (
                                    <ListWithLogo key={index} title={card.title} url={card.url} image={card?.imageSrc}/>
                                ))}
                            </>
                        </div>
                    </>
                )}
            </div>
            <CarouselS/>
            <div className={`${universities.length ? '' : 'university-footer'}`}>
                <Footer/>
            </div>
        </>);
};

export default Universities;
