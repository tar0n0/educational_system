import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesWrapper from './components/routesWrapper';
import FormValuesProvider from './context/formContext';
import ModalContentProvider from './context/modalContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

function App() {
    return (
        <>
            <ModalContentProvider>
                <FormValuesProvider>
                    <BrowserRouter>
                        <RoutesWrapper/>
                    </BrowserRouter>
                </FormValuesProvider>
            </ModalContentProvider>
            <ToastContainer/>
        </>
    );
}

export default App;
