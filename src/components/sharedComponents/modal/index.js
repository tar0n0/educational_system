import React from 'react';

import './style.css';

const Modal = ({ onClose, isOpen, children }) => {
    if (isOpen === false) {
        return null;
    }

    return (
        <div className="modal">
            <div className="bg" />
            <div className="content">{children}</div>
        </div>
    );
};

export default Modal;
