import React from 'react';
import './style.css';

const Loader = () => {
    return (
        <>
            <div className="circle">
                <div className="transparentBorder">
                    <p className="loadText">Loading</p>
                    <div className="progress"></div>
                </div>
            </div>
            <div className="blur"></div>
        </>
    );
};

export default Loader;
