import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ENDPOINT_URLS, GET_ALL_COMPANIES } from '../../../constants/api.constants';
import DataService from '../../../services/dataService';
import { getStorageItem } from '../../../storage';
import AccountMenu from '../../sharedComponents/menuWithAvatar';
import Footer from '../../sharedComponents/footer/footer';
import { useNavigate } from 'react-router-dom';
import CarouselS from '../../sharedComponents/slideShow';
import { EXTENDED_SEARCH } from '../../../constants/pathnames.constants';
import { modalContext } from '../../../context/modalContext';
import AuthorizationService from '../../../services/authorizationService';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SimpleCard from '../../simplCard';
// import cards from "./store";

import '../home/home.css';


const useStyles = makeStyles(theme => ({
    pageTitle: {
        display: "block",
        position: 'static',
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
        position:'static',
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gridGap: "30px",
        maxWidth: "900px",
        margin: "0 auto 20px"
    },
    cardsLayoutItem: {
        position: "static"
    }
}));

const Companies = () => {
    const { setOpen } = useContext(modalContext);
    const [isUser, setIsUser] = useState(false);
    const [companies, setCompanies] = useState([]);
    const classes = useStyles();
    const navigate = useNavigate();

    useEffect(() => {
        const subscription = AuthorizationService.isUserStatus.subscribe(setIsUser);
        return () => subscription && subscription.unsubscribe();
    }, [isUser]);

    useEffect(() => {
        DataService.getJson(ENDPOINT_URLS[GET_ALL_COMPANIES]).then(val => {
            const { data } = val;
            const currentData = data.map(el => {
                return {
                    title: el?.companyName,
                    url: el?.companyLink || '',
                };
            });
            setCompanies(_ => currentData);
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
                                fill="white"
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
                        <Typography variant="h4">Companies</Typography>
                    </section>
                    <section className={classes.cardsLayout}>
                        {companies.map((card, index) => (
                            <SimpleCard key={index} title={card?.title} url={card?.url} classes={classes}/>
                        ))}
                    </section>
                </main>
            </div>
            <CarouselS/>
            <div className="company-footer">
                <Footer/>
            </div>
        </>);
};

export default Companies;
