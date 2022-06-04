import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesWrapper from './components/routesWrapper';
import FormValuesProvider from './context/formContext';
import ModalContentProvider from './context/modalContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//COMPANY Uploadi jamanak filei anune, upload file poxel upload logo,  bolor texere
//logini jamanak poxem email
//Update Profile dzel
//studente chi karox courses u announcement add anel
//Confirmi jamanak tarberakel Confirmed i call ere
import './App.css';
import UserIdProvider from './context/userIdContext';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap"; // <-- JS File

function App() {
    useEffect(() => {
    }, []);
    return (
        <>
            <ModalContentProvider>
                <FormValuesProvider>
                    <UserIdProvider>
                        <BrowserRouter>
                            <RoutesWrapper/>
                        </BrowserRouter>
                    </UserIdProvider>
                </FormValuesProvider>
            </ModalContentProvider>
            <ToastContainer/>
        </>
    );
}

export default App;
