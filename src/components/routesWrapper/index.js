import React, { useContext } from 'react';
import { Route, Routes, useRoutes } from 'react-router';
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
import MaxWidthDialog from '../modalsContent';
import { modalContext } from '../../context/modalContext';

const RoutesWrapper = () => {
    const [open, setOpen] = useContext(modalContext);
    // const element = useRoutes(routesConfig);
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/universities" element={<Universities/>}/>
                <Route path="/companies" element={<Companies/>}/>
                <Route path="/contacts" element={<Contact/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>
                <Route path="/sign-up/user" element={<UserForm/>}/>
                <Route path="/sign-up/university" element={<UserForm/>}/>
                <Route path="/sign-up/company" element={<UserForm/>}/>
                {/*<Route path="/sign-up" element={<SignUp/>}/>*/}
                <Route path="/user-page" element={<UserPage/>}/>
                <Route path="/company-page" element={<CompanyPage/>}/>
                <Route path="/university-page" element={<UniversityPage/>}/>
            </Routes>
            <MaxWidthDialog open={open} setOpen={setOpen}/>
        </>

    );
};

export default RoutesWrapper;
