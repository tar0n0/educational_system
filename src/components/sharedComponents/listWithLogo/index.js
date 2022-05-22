import React from 'react';
import polytechnic from '../../../assets/aboutUs.jpg';
import { useNavigate } from 'react-router-dom';

import './list.css';

const ListWithLogo = ({ url, title, image }) => {
    return (
        <>
            <div className='container-with-logo-card'>
                <div onClick={() => window.open(url)} className='block-for-image-logo'>
                    <img src={image || polytechnic} alt=""/>
                </div>
                <div><p className="block-for-name-logo" onClick={() => window.open(url)}>{title}<span
                    className=""> </span></p></div>
            </div>
        </>
    );
};

export default ListWithLogo;
