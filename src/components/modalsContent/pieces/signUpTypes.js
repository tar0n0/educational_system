import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import '../style.css';
import { COMPANY_COUNTRIES, UNIVERSITY_COUNTRIES } from '../../../constants/api.constants';
import { USER_TYPE } from '../../../constants/ui.constants';
import { modalContext } from '../../../context/modalContext';
import DataService from '../../../services/dataService';

const UserType = ({  }) => {
    const [userFrom, setUserFrom] = useState(false);
    const [universityType, setUniversityType] = useState(false);
    const { setOpen, setType } = useContext(modalContext);
    const [registerId, setRegisterId] = useState('');
    return (
        <>
            {!userFrom && !universityType ? (
                <>
                    <p className="select-user-type">Select User type</p>
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
                                setOpen(false);
                            }}>
                                <span className="link-btn" onClick={() => setOpen(false)}>Company</span>
                            </Link>
                        </Button>
                        <Button variant="contained" onClick={() => setUserFrom(true)}>
                            <span className="link-btn" onClick={() => setUserFrom(true)}>User </span>
                        </Button>
                    </Stack>
                </>
            ) : !universityType && userFrom ? (
                <>
                    <>
                        <p className="select-user-type"> What do you want to register under?</p>
                        <Stack spacing={5}>
                            <Button variant="contained" onClick={() => {
                                DataService.getUserType.next(1);
                                setUniversityType(true);
                                setUserFrom(false);
                            }}>
                                <span className="link-btn" onClick={() => {
                                    DataService.getUserType.next(1);
                                    setUniversityType(true);
                                    setUserFrom(false);
                                }}> University</span>
                            </Button>
                            <Button variant="contained">
                                <Link className={'link'} to={'/sign-up/user'} onClick={() => {
                                    DataService.getUserType.next(2);
                                    setOpen(false);
                                }}>
                                    <span className="link-btn" onClick={() => {
                                        DataService.getUserType.next(2);
                                        setOpen(false);
                                    }}>Company</span>
                                </Link>
                            </Button>
                        </Stack>
                    </>
                </>
            ) : <>
                <p className="select-user-type">Are you a student or a lecturer?</p>
                <Stack spacing={5}>
                    <Button variant="contained" onClick={() => setOpen(false)}>
                        <Link className={'link'} to={'/sign-up/user'} onClick={() => {
                            setOpen(false);
                        }}>
                            <span className="link-btn" onClick={() => setOpen(false)}>Student</span>
                        </Link>
                    </Button>
                    <Button variant="contained">
                        <Link className={'link'} to={'/sign-up/user'} onClick={() => {
                            setOpen(false);
                        }}>
                            <span className="link-btn" onClick={() => setOpen(false)}>Lecturer</span>
                        </Link>
                    </Button>
                </Stack>
            </>}
        </>
    );
};

export default UserType;
