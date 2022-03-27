import React, { createContext, useState } from 'react';

export const modalContext = createContext();

const ModalContentProvider = (props) => {
    const [type, setType] = useState('');
    const [open, setOpen] = useState(false);

    return (
        <modalContext.Provider
            value={{open, setOpen, type, setType}}
        >
            {props.children}
        </modalContext.Provider>
    );
};

export default ModalContentProvider;
