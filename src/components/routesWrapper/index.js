import React, { useContext, useState } from 'react';
import { Route, Routes, useRoutes } from 'react-router';
import BasicModal from '../modalsContent';
import { routesConfig } from '../../utils/routes';
import { modalContext } from '../../context/modalContext';
import FullScreenDialog from '../sharedComponents/fullScreenDialog';


const RoutesWrapper = () => {
    const { open, setOpen, type, setType, setOpenDialog, openDialog } = useContext(modalContext);
    const element = useRoutes(routesConfig);

    return (
        <>
            {element}
            <BasicModal open={open} setOpen={setOpen} type={type} setType={setType}/>
            <FullScreenDialog />
        </>
    );
};

export default RoutesWrapper;
