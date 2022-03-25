import React, { useEffect, useState } from 'react';
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
import RecommendRoundedIcon from '@mui/icons-material/RecommendRounded';
import { toast } from 'react-toastify';
import {
    ENDPOINT_URLS,
    COMPANY_CONFIRM_PROFILES,
    UNIVERSITY_CONFIRM_PROFILES,
    CONFIRMED_COMPANY_USER,
    CONFIRMED_UNIVERSITY_USER,
} from '../../../../constants/api.constants';
import { USER_TYPE } from '../../../../constants/ui.constants';
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
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9)
// ];

const ConfirmProfile = () => {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const { UNIVERSITY, COMPANY } = USER_TYPE || {};
    let pathName = window.location.pathname;

    useEffect(() => {
        if (pathName.includes(UNIVERSITY.toLowerCase())) {
            DataService.getJson(ENDPOINT_URLS[UNIVERSITY_CONFIRM_PROFILES]).then(val => {
                const { data } = val;
                setData(() => data.map(el => createData(el)));
            }).catch(err => {
                toast.error(
                    'Something went wrong', {
                        type: toast.TYPE.ERROR,
                        icon: true,
                        theme: 'dark'
                    }
                );
            });
        } else {
            DataService.getJson(ENDPOINT_URLS[COMPANY_CONFIRM_PROFILES]).then(val => {
                const { data } = val;
                setData(() => data.map(el => createData(el)));
            }).catch(err => {
                toast.error(
                    'Something went wrong', {
                        type: toast.TYPE.ERROR,
                        icon: true,
                        theme: 'dark'
                    }
                );
            });
        }
    }, []);
    const handleEdit = (values, q = 7) => {
        console.log(values);
        DataService.postJson(ENDPOINT_URLS[CONFIRMED_COMPANY_USER], [values.email]);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Emails</TableCell>
                            {/*<TableCell align="right">Calories</TableCell>*/}
                            {/*<TableCell align="right">Fat&nbsp;(g)</TableCell>*/}
                            {/*<TableCell align="right">Carbs&nbsp;(g)</TableCell>*/}
                            {/*<TableCell align="right">Protein&nbsp;(g)</TableCell>*/}
                            {/*<TableCell align="right">Actions</TableCell>*/}
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
                                {/*<TableCell align="right">{row.carbs}</TableCell>*/}
                                {/*<TableCell align="right">{row.protein}</TableCell>*/}
                                <TableCell align="right">
                                    <Button onClick={() => handleEdit(row)}>
                                        <DeleteForeverIcon/>
                                    </Button>
                                    <Button onClick={() => handleEdit(row)}>
                                        <RecommendRoundedIcon/>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ConfirmProfile;
