import React from 'react';

import './style.css';

const EventAnimationSVG = ({ context = 'Welcome to  About Page' }) => {
    return (
        <>
            <div>
                <div className="text">{context}</div>
            </div>
        </>
    );
};

export default EventAnimationSVG;
