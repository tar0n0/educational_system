import React from 'react';
import Login from '../components/auth/login';
import CompanyForm from '../components/auth/pieces/formsForUserTypes/companyForm';
import UniversityForm from '../components/auth/pieces/formsForUserTypes/universityForm';
import UserForm from '../components/auth/pieces/formsForUserTypes/userForm';
import Announcements from '../components/pages/announcements';
import CompanyEntry from '../components/pages/companies/companyEntry';
import Courses from '../components/pages/courses';
import ExtendedSearch from '../components/pages/extendedSearch';
import UserPage from '../components/pages/rolePages/user';
import CompanyPage from '../components/pages/rolePages/company';
import UniversityPage from '../components/pages/rolePages/university';
import About from '../components/pages/about';
import Companies from '../components/pages/companies';
import Contact from '../components/pages/contacts';
import Home from '../components/pages/home';
import Universities from '../components/pages/universities';
import UniversityEntry from '../components/pages/universities/universityEntry';
import Error from '../components/sharedComponents/notFound';
import UserProfilesPages from '../components/sharedComponents/userProfilesPages';
import {
    ABOUT,
    ANNOUNCEMENTS_PAGE,
    COMPANIES,
    COMPANY_NAME,
    COMPANY_PAGE,
    CONTACTS,
    COURSES_PAGE,
    EXTENDED_SEARCH,
    HOME,
    LOGIN,
    NOT_FOUND,
    SHOW_PROFILE,
    SIGN_UP_COMPANY,
    SIGN_UP_UNIVERSITY,
    SIGN_UP_USER,
    UNIVERSITIES, UNIVERSITY_NAME,
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
        element: <UniversityForm/>
    },
    {
        path: SIGN_UP_COMPANY,
        element: <CompanyForm/>
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
        path: SHOW_PROFILE,
        element: <UserProfilesPages/>
    },
    {
        path: NOT_FOUND,
        element: <Error/>,
    },
    {
        path: UNIVERSITY_NAME,
        element: <UniversityEntry/>,
    },
    {
        path: COMPANY_NAME,
        element: <CompanyEntry />,
    },
    {
        path: COURSES_PAGE,
        element: <Courses />
    },
    {
        path: ANNOUNCEMENTS_PAGE,
        element: <Announcements />,
    }
];
