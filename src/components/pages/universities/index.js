import Typography from '@material-ui/core/Typography';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ENDPOINT_URLS, GET_ALL_UNIVERSITIES } from '../../../constants/api.constants';
import { EXTENDED_SEARCH } from '../../../constants/pathnames.constants';
import DataService from '../../../services/dataService';
import { getStorageItem } from '../../../storage';
import AccountMenu from '../../sharedComponents/menuWithAvatar';
import Footer from '../../sharedComponents/footer/footer';
import CarouselS from '../../sharedComponents/slideShow';
import { modalContext } from '../../../context/modalContext';
import AuthorizationService from '../../../services/authorizationService';
import SimpleCard from '../../simplCard';
import { makeStyles } from "@material-ui/core/styles";

import '../home/home.css';

// import cards from "./store";

import '../home/home.css';


const useStyles = makeStyles(theme => ({
    pageTitle: {
        display: "block",
        margin: "16px 0px 32px 0px",
        width: "100%",
        justifyContent: "center",
        // textAlign: "center",
        color: "#194d94",
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
    const { setOpen } = useContext(modalContext);
    const [isUser, setIsUser] = useState(false);
    const [universities, setUniversities] = useState([]);
    const navigate = useNavigate();
    const classes = useStyles();

    useEffect(() => {
        const subscription = AuthorizationService.isUserStatus.subscribe(setIsUser);
        return () => subscription && subscription.unsubscribe();
    }, [isUser]);

    useEffect(() => {
        DataService.getJson(ENDPOINT_URLS[GET_ALL_UNIVERSITIES]).then(val => {
            const { data } = val;
            const currentData = data.map(el => {
                return {
                    title: el?.universityName,
                    url: el?.universityLink || '',
                };
            });
            setUniversities(_ => currentData);
        });
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
                            <span className="sign-up" onClick={() => setOpen(true)}>
                        SignUp
                            </span>
                        </>
                    )}
                </div>
                <div className="search">
                    <input className="search-input" placeholder="Search" autoComplete="off"/>
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
                <main>
                    <section className={classes.pageTitle}>
                        <Typography variant="h4">Universities</Typography>
                    </section>
                    <section className={classes.cardsLayout}>
                        {universities.map((card, index) => (
                            <SimpleCard key={index} title={card?.title} url={card?.url} classes={classes}/>
                        ))}
                    </section>
                </main>
            </div>
            <CarouselS/>
            <div className="university-footer">
                <Footer/>
            </div>
        </>);
};

export default Universities;
