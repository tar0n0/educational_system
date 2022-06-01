import { toast } from 'react-toastify';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ENDPOINT_URLS, GET_ANNOUNCEMENTS, INPUT_SEARCH } from '../../../constants/api.constants';
import { USER_TYPES_FOR_MODAL } from '../../../constants/modals.constat';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EXTENDED_SEARCH } from '../../../constants/pathnames.constants';
import { SubMenuTypes } from '../../../constants/ui.constants';
import DataService from '../../../services/dataService';
import { getStorageItem } from '../../../storage';
import DataList from '../../sharedComponents/dataList';
import AccountMenu from '../../sharedComponents/menuWithAvatar';
import Footer from '../../sharedComponents/footer/footer';
import CarouselS from '../../sharedComponents/slideShow';
import { modalContext } from '../../../context/modalContext';
import AuthorizationService from '../../../services/authorizationService';

// import '../home/home.css';

const Announcements = () => {
    const { setOpen, setType, setOpenDialog } = useContext(modalContext);
    const [isUser, setIsUser] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [data, setData] = useState([]);
    const ref = useRef();
    const navigate = useNavigate();


    useEffect(() => {
        DataService.getJson(ENDPOINT_URLS[GET_ANNOUNCEMENTS]).then(val => {
            setData(val?.data);
        });
    }, []);

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
                            <span className="sign-up" onClick={() => {
                                setOpen(true);
                                setType(USER_TYPES_FOR_MODAL);
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
            {searchData?.length ? (
                <>
                    <div className="content">
                        <DataList data={searchData} title="Search Data"/>
                    </div>
                </>
            ) : (
                <>
                    <div className="content">
                        {data?.length ? (
                            <>
                                {data?.map(el => {
                                    return (
                                        <>
                                            {el?.content?.length ? (
                                                <div className="posts">
                                                    <h2 className="title-announcement">{el?.title}</h2>
                                                    {el?.content.substring(1, 300)}
                                                    <p className="style-6" onClick={() => {
                                                        DataService.getAnnouncement.next(el);
                                                        DataService.getSubMenuType.next(SubMenuTypes.ANNOUNCEMENT_FOR_PAGE);
                                                        setOpenDialog(true);
                                                    }}>Read More</p>
                                                    <p className='author-for-courses-and-announcement'>Author:: {el?.authorName} {el?.authorSurName}</p>
                                                </div>
                                            ) : null}
                                        </>
                                    );
                                })}
                            </>
                        ) : (
                            <>
                                <h1>Announcements</h1>
                                <div className="posts">
                                    <h2 className="title-announcement">Read More</h2>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar lacus id
                                    urna sagittis
                                    egestas.
                                    Mauris id bibendum purus, vestibulum tristique mauris. Nullam dapibus sem non nulla
                                    lobortis,
                                    vitae
                                    blandit sem volutpat. Integer fringilla aliquet nulla eu aliquam. Donec euismod
                                    scelerisque mi
                                    quis
                                    lobortis.<br/><br/> Aliquam convallis risus ligula, non pellentesque dolor hendrerit
                                    id. Nunc
                                    facilisis
                                    arcu nulla, nec tempus neque scelerisque vel. Donec pharetra dolor eget ullamcorper
                                    porta.
                                    Suspendisse
                                    interdum diam velit, nec porta magna elementum quis. Etiam id suscipit est. Cras
                                    rhoncus felis
                                    tincidunt
                                    lorem rutrum, id vehicula neque scelerisque. Fusce a tempor ipsum, quis accumsan
                                    nisl.

                                    <a href="#" className="style-6">Read More</a>
                                </div>
                                <div className="posts">
                                    <h2 className="title-announcement">Read More</h2>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar lacus id
                                    urna sagittis
                                    egestas.
                                    Mauris id bibendum purus, vestibulum tristique mauris. Nullam dapibus sem non nulla
                                    lobortis,
                                    vitae
                                    blandit sem volutpat. Integer fringilla aliquet nulla eu aliquam. Donec euismod
                                    scelerisque mi
                                    quis
                                    lobortis.<br/><br/> Aliquam convallis risus ligula, non pellentesque dolor hendrerit
                                    id. Nunc
                                    facilisis
                                    arcu nulla, nec tempus neque scelerisque vel. Donec pharetra dolor eget ullamcorper
                                    porta.
                                    Suspendisse
                                    interdum diam velit, nec porta magna elementum quis. Etiam id suscipit est. Cras
                                    rhoncus felis
                                    tincidunt
                                    lorem rutrum, id vehicula neque scelerisque. Fusce a tempor ipsum, quis accumsan
                                    nisl.

                                    <a href="#" className="style-6">Read More</a>
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
            <CarouselS/>
            <div className="about-footer">
                <Footer/>
            </div>
        </>
    );
};

export default Announcements;
