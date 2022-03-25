import React, { createContext, useState } from 'react';

export const modalContext = createContext();

const ModalContentProvider = (props) => {
    const [open, setOpen] = useState(false);

    return (
        <modalContext.Provider
            value={[open, setOpen]}
        >
            {props.children}
        </modalContext.Provider>
    );
};

export default ModalContentProvider;
