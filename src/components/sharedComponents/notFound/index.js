import React from "react";
import { Link } from "react-router-dom";
import ErrorIcon from '../errorIcon';

import "./notFound.css";

const Error = () => (
    <>
        <div className="errorWrap">
            <ErrorIcon/>
            <h4>There's nothing here!</h4>
            <p>Sorry, the page you were looking for in this blog does not exist.</p>
            <Link to="/" className="homepage" href="https://infokudia.blogspot.com">
                <i className="fas fa-home"></i>
                Home
            </Link>
        </div>
    </>
);

export default Error;
