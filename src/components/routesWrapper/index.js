import React, { useContext } from 'react';
import { Route, Routes, useRoutes } from 'react-router';
import BasicModal from '../modalsContent';
import { routesConfig } from '../../utils/routes';
import { modalContext } from '../../context/modalContext';


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
