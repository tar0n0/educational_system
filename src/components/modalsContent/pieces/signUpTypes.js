import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import '../style.css';
import { COMPANY_COUNTRIES, UNIVERSITY_COUNTRIES } from '../../../constants/api.constants';
import DataService from '../../../services/dataService';

const UserType = ({ setOpen }) => {
    return (
        <>
            <Stack direction="row" spacing={2}>
                <Button variant="contained">
                    <Link className={'link'} to={'/sign-up/university'} onClick={() => {
                        setOpen(false);

                    }}>
                        <span className="link-btn" onClick={() => setOpen(false)}> University</span>
                    </Link>
                </Button>
                <Button variant="contained">
                    <Link className={'link'} to={'/sign-up/company'} onClick={() => {
                        setOpen(false)
                    }}>
                        <span className="link-btn" onClick={() => setOpen(false)}>Company</span>
                    </Link>
                </Button>
                <Button variant="contained">
                    <Link className={'link'} to={'/sign-up/user'} onClick={() => setOpen(false)}>
                        <span className="link-btn" onClick={() => setOpen(false)}>User </span>
                    </Link>
                </Button>
            </Stack>
        </>
    );
};

export default UserType;
