import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesWrapper from './components/routesWrapper';
import FormValuesProvider from './context/formContext';
import ModalContentProvider from './context/modalContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import UserIdProvider from './context/userIdContext';

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
