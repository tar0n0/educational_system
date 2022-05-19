import React from 'react';
import polytechnic from '../../../assets/aboutUs.jpg';
import { useNavigate } from 'react-router-dom';

import './list.css';

const ListWithLogo = ({ url, title, image }) => {
    const navigate = useNavigate();
    return (
        <>
            <div className='container-with-logo-card'>
                <div onClick={() => navigate(`/university/:${title}`)} className='block-for-image-logo'>
                    <img src={image || polytechnic} alt=""/>
                </div>
                <div><p className="block-for-name-logo" onClick={() => navigate(`/university/:${title}`)}>{title}<span
                    className=""> </span></p></div>
            </div>
        </>
    );
};

export default ListWithLogo;
