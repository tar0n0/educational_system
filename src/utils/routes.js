import React from 'react';
import Login from '../components/auth/login';
import UserForm from '../components/auth/pieces/formsForUserTypes/userForm';
import ExtendedSearch from '../components/pages/extendedSearch';
import UserPage from '../components/pages/rolePages/user';
import CompanyPage from '../components/pages/rolePages/company';
import UniversityPage from '../components/pages/rolePages/university';
import About from '../components/pages/about';
import Companies from '../components/pages/companies';
import Contact from '../components/pages/contacts';
import Home from '../components/pages/home';
import Universities from '../components/pages/universities';
import Error from '../components/sharedComponents/notFound';
import {
    ABOUT,
    COMPANIES,
    COMPANY_PAGE,
    CONTACTS,
    EXTENDED_SEARCH,
    HOME,
    LOGIN,
    SIGN_UP_COMPANY,
    SIGN_UP_UNIVERSITY,
    SIGN_UP_USER,
    UNIVERSITIES,
    UNIVERSITY_PAGE, USER_PAGE
} from '../constants/pathnames.constants';

export const routesConfig = [
    {
        path: HOME,
        element: <Home/>,
    },
    {
        path: ABOUT,
        element: <About/>,
    },
    {
        path: UNIVERSITIES,
        element: <Universities/>,
    },
    {
        path: COMPANIES,
        element: <Companies/>,
    },
    {
        path: CONTACTS,
        element: <Contact/>,
    },
    {
        path: LOGIN,
        element: <Login/>,
    },
    {
        path: SIGN_UP_USER,
        element: <UserForm/>
    },
    {
        path: SIGN_UP_UNIVERSITY,
        element: <UserForm/>
    },
    {
        path: SIGN_UP_COMPANY,
        element: <UserForm/>
    },
    {
        path: USER_PAGE,
        element: < UserPage/>
    },
    {
        path: COMPANY_PAGE,
        element: <CompanyPage/>
    },
    {
        path: UNIVERSITY_PAGE,
        element: <UniversityPage/>,
    },
    {
        path: EXTENDED_SEARCH,
        element: <ExtendedSearch/>,
    },
    {
        path: '*',
        element: <Error/>,
    },
];
