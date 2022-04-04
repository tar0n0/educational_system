import React, { useContext } from 'react';
import { Route, Routes, useRoutes } from 'react-router';
// import SignUp from '../auth/signUp';
// import About from '../pages/about';
// import Companies from '../pages/companies';
// import Contact from '../pages/contacts';
// import ExtendedSearch from '../pages/extendedSearch';
// import Home from '../pages/home';
// import Universities from '../pages/universities';
// import Login from '../auth/login';
// import UserForm from '../auth/pieces/formsForUserTypes/userForm';
// import UserPage from '../pages/rolePages/user';
// import CompanyPage from '../pages/rolePages/company';
// import UniversityPage from '../pages/rolePages/university';
import BasicModal from '../modalsContent';
import { routesConfig } from '../../utils/routes';
import { modalContext } from '../../context/modalContext';
// import {
//     COMPANIES,
//     CONTACTS,
//     UNIVERSITIES,
//     HOME,
//     ABOUT,
//     LOGIN,
//     SIGN_UP_USER,
//     SIGN_UP_UNIVERSITY,
//     SIGN_UP_COMPANY,
//     SIGN_UP,
//     UNIVERSITY_PAGE,
//     USER_PAGE,
//     COMPANY_PAGE,
//     EXTENDED_SEARCH,
// } from '../../constants/pathnames.constants';

const RoutesWrapper = () => {
    const { open, setOpen, type, setType } = useContext(modalContext);
    const element = useRoutes(routesConfig);
    return (
        <>
            {element}
            <BasicModal open={open} setOpen={setOpen} type={type} setType={setType}/>
        </>
    );
};

export default RoutesWrapper;
