import React, { useState } from 'react';
import Header from '../headerActions';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import './style.css';
import { Link } from 'react-router-dom';
import Footer from '../sharedComponents/footer/footer';


const SignUp = () => {
    const [type, setType] = useState('');

    const handleChange = (event) => {
        setType(event.target.value);
    };

    return (
        <>
            <Header/>
            {/*<div className='dropdown-user-type'>*/}
            {/*    <h1 className='selcet-role-type'> Select user type</h1>*/}
            {/*    <FormControl variant="standard" sx={{m: 5, minWidth: 500}}>*/}
            {/*        <InputLabel id="demo-simple-select-standard-label">User Type</InputLabel>*/}
            {/*        <Select*/}
            {/*            labelId="demo-simple-select-standard-label"*/}
            {/*            id="demo-simple-select-standard"*/}
            {/*            value={type}*/}
            {/*            onChange={handleChange}*/}
            {/*            label="User Type"*/}
            {/*        >*/}
            {/*            <MenuItem value="">*/}
            {/*                <em>None</em>*/}
            {/*            </MenuItem>*/}
            {/*            <Link className={'link'} to={'/sign-up/university'}>*/}
            {/*                <MenuItem value={"University"}>*/}
            {/*                    University*/}
            {/*                </MenuItem>*/}
            {/*            </Link>*/}
            {/*            <Link className={'link'} to={'/sign-up/company'}>*/}
            {/*                <MenuItem value={'Company'}>*/}
            {/*                    Company*/}
            {/*                </MenuItem>*/}
            {/*            </Link>*/}
            {/*            <Link className={'link'} to={'/sign-up/user'}>*/}
            {/*                <MenuItem value={'User'}>*/}
            {/*                    User*/}
            {/*                </MenuItem>*/}
            {/*            </Link>*/}
            {/*        </Select>*/}
            {/*    </FormControl>*/}
            {/*</div>*/}
            <Footer/>
        </>
    );
};
export default SignUp;
