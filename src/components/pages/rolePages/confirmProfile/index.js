import { CircularProgress } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckIcon from '@mui/icons-material/Check';
import { toast } from 'react-toastify';
import {
    ENDPOINT_URLS,
    COMPANY_CONFIRM_PROFILES,
    UNIVERSITY_CONFIRM_PROFILES,
    CONFIRMED_COMPANY_USER,
} from '../../../../constants/api.constants';
import { CONFIRM_SUCCESS, ERROR_CONFIRM, GLOBAL_ERROR } from '../../../../constants/messages.constants';
import { DELETE_EMAILS } from '../../../../constants/modals.constat';
import { USER_TYPE } from '../../../../constants/ui.constants';
import { modalContext } from '../../../../context/modalContext';
import DataService from '../../../../services/dataService';

const useStyles = makeStyles({
    table: {
        minWidth: 650
    }
});

function createData(email) {
    return { email };
}

// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
// ];

const ConfirmProfile = () => {
    const classes = useStyles();
    const [data, setData] = useState(DataService.getConfirmedProfiles.getValue());
    const [isLoading, setIsLoading] = useState(false);
    const { setOpen, setType } = useContext(modalContext);
    const { UNIVERSITY } = USER_TYPE || {};
    let pathName = window.location.pathname;

    const getInitialData = () => {
        setIsLoading(true);
        if (pathName.includes(UNIVERSITY.toLowerCase())) {
            DataService.getJson(ENDPOINT_URLS[UNIVERSITY_CONFIRM_PROFILES]).then(val => {
                const { data } = val;
                const currentData = data.map(el => createData(el));
                DataService.getConfirmedProfiles.next(currentData);
                setData(DataService.getConfirmedProfiles.getValue);
            }).catch(_ => {
                toast.error(
                    GLOBAL_ERROR, {
                        type: toast.TYPE.ERROR,
                        icon: true,
                        theme: 'dark'
                    }
                );
            }).finally(() => setIsLoading(false));
        } else {
            DataService.getJson(ENDPOINT_URLS[COMPANY_CONFIRM_PROFILES]).then(val => {
                const { data } = val;
                const companyCurrentData = data.map(el => createData(el));
                DataService.getConfirmedProfiles.next(companyCurrentData);
                setData(DataService.getConfirmedProfiles.getValue());
            }).catch(_ => {
                toast.error(
                    GLOBAL_ERROR, {
                        type: toast.TYPE.ERROR,
                        icon: true,
                        theme: 'dark'
                    }
                );
            }).finally(() => setIsLoading(false));
        }
    };

    useEffect(() => {
        getInitialData();
    }, []);

    const handleConfirm = (values) => {
        DataService.postJson(ENDPOINT_URLS[CONFIRMED_COMPANY_USER], [values.email]).then(_ => {
            toast.success(
                CONFIRM_SUCCESS, {
                    type: toast.TYPE.SUCCESS,
                    icon: true,
                    theme: 'dark'
                });
            getInitialData();
        }).catch(_ => {
            toast.error(
                ERROR_CONFIRM, {
                    type: toast.TYPE.ERROR,
                    icon: true,
                    theme: 'dark'
                }
            );
        });

    };

    const handleDeleteUser = (values) => {
        DataService.userForDelete.next({
            email: values?.email,
            state: setData,
        });
        setType(DELETE_EMAILS);
        setOpen(true);
    };

    return (
        <>
            {!isLoading ? (
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Emails</TableCell>
                                {/*<TableCell align="right">Calories</TableCell>*/}
                                {/*<TableCell align="right">Fat&nbsp;(g)</TableCell>*/}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map(row => (
                                <TableRow key={row.email}>
                                    <TableCell component="th" scope="row">
                                        {row.email}
                                    </TableCell>
                                    {/*<TableCell align="right">{row.calories}</TableCell>*/}
                                    {/*<TableCell align="right">{row.fat}</TableCell>*/}
                                    <TableCell align="right">
                                        <Button onClick={() => handleDeleteUser(row)}>
                                            <DeleteForeverIcon color="error"/>
                                        </Button>
                                        <Button onClick={() => handleConfirm(row)}>
                                            <CheckIcon color="success"/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <CircularProgress/>
            )}
        </>
    );
};

export default ConfirmProfile;
