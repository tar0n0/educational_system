import React, { useContext } from 'react';
import { Route, Routes } from 'react-router';
import SignUp from '../auth/signUp';
import About from '../pages/about';
import Companies from '../pages/companies';
import Contact from '../pages/contacts';
import Home from '../pages/home';
import Universities from '../pages/universities';
import Login from '../auth/login';
import UserForm from '../auth/pieces/formsForUserTypes/userForm';
import UserPage from '../pages/rolePages/user';
import CompanyPage from '../pages/rolePages/company';
import UniversityPage from '../pages/rolePages/university';
import BasicModal from '../modalsContent';
import { modalContext } from '../../context/modalContext';
import {
    COMPANIES,
    CONTACTS,
    UNIVERSITIES,
    HOME,
    ABOUT,
    LOGIN,
    SIGN_UP_USER,
    SIGN_UP_UNIVERSITY,
    SIGN_UP_COMPANY,
    SIGN_UP,
    UNIVERSITY_PAGE,
    USER_PAGE,
    COMPANY_PAGE,
} from '../../constants/pathnames.constants';

const RoutesWrapper = () => {
    const { open, setOpen, type, setType } = useContext(modalContext);
    // const element = useRoutes(routesConfig);
    return (
        <>
            <Routes>
                <Route path={HOME} element={<Home/>}/>
                <Route path={ABOUT} element={<About/>}/>
                <Route path={UNIVERSITIES} element={<Universities/>}/>
                <Route path={COMPANIES} element={<Companies/>}/>
                <Route path={CONTACTS} element={<Contact/>}/>
                <Route path={LOGIN} element={<Login/>}/>
                <Route path={SIGN_UP} element={<SignUp/>}/>
                <Route path={SIGN_UP_USER} element={<UserForm/>}/>
                <Route path={SIGN_UP_UNIVERSITY} element={<UserForm/>}/>
                <Route path={SIGN_UP_COMPANY} element={<UserForm/>}/>
                <Route path={USER_PAGE} element={<UserPage/>}/>
                <Route path={COMPANY_PAGE} element={<CompanyPage/>}/>
                <Route path={UNIVERSITY_PAGE} element={<UniversityPage/>}/>
            </Routes>
            <BasicModal open={open} setOpen={setOpen} type={type} setType={setType}/>
        </>

    );
};

export default RoutesWrapper;
