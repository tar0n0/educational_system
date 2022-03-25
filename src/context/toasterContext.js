import React, { createContext, useState } from 'react';

export const toasterContext = createContext();

const ToasterNotificationProvider = (props) => {
    const [toast, setToast] = useState(null);

    return (
        <toasterContext.Provider
            value={[toast, setToast]}
        >
            {props.children}
        </toasterContext.Provider>
    );
};

export default ToasterNotificationProvider;
