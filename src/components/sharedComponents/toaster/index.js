import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Notification from '../notification';

import './toaster.scss.scss';

const CustomToaster = ({ toastProps }) => {
    const [toastsList, updateToastsList] = useState([]);
    const ref = useRef();

    const timeout = 3000;

    const addToastMessage = (toastProps) => {
        updateToastsList(arr => [{ ...toastProps, show: true }, ...arr]);
    };

    const hideToastMessage = (id, time = timeout) => {
        setTimeout(() => {
            updateToastsList(arr => arr.map(val => val.id === id ? { ...val, show: false } : val));
        }, time);
    };

    const removeToastMessage = (id) => {
        setTimeout(() => {
            updateToastsList(arr => arr.filter(val => val.id !== id));
        }, 1000);
    };

    useEffect(() => {
        toastProps && addToastMessage({
            ...toastProps,
            title: toastProps?.title,
            message: toastProps?.message,
            applyText: toastProps?.applyText,
        });
    }, [toastProps]);

    return !!toastsList.length && ReactDOM.createPortal((
        <ul className="toaster-holder" ref={ref}>
            {toastsList.map((notification) => {
                return (
                    <Notification
                        key={`${notification?.id}`}
                        data={notification}
                        onMessageHide={hideToastMessage}
                        onClose={removeToastMessage}
                    />
                );
            })}
        </ul>
    ), document.body
    );
};

CustomToaster.propTypes = {
    toasts: PropTypes.arrayOf(PropTypes.object),
};

export default CustomToaster;
