import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import { CircularProgress } from '@mui/material';
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import CheckIcon from '@mui/icons-material/Check';
import { toast } from 'react-toastify';
import {
    ENDPOINT_URLS,
    COMPANY_CONFIRM_PROFILES,
    UNIVERSITY_CONFIRM_PROFILES,
    CONFIRMED_COMPANY_USER,
    CONFIRMED_UNIVERSITY_USER,
} from '../../../../constants/api.constants';
import { CONFIRM_SUCCESS, ERROR_CONFIRM, GLOBAL_ERROR } from '../../../../constants/messages.constants';
import { DELETE_EMAILS } from '../../../../constants/modals.constat';
import { USER_TYPE } from '../../../../constants/ui.constants';
import { modalContext } from '../../../../context/modalContext';
import DataService from '../../../../services/dataService';
import { getStorageItem } from '../../../../storage';

function createData(email, name, surName) {
    return { email, name, surName };
}

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function getSorting(order, orderBy) {
    return order === "desc"
        ? (a, b) => desc(a, b, orderBy)
        : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
    {
        id: "email",
        numeric: false,
        disablePadding: true,
        label: "Email",
    },
    {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Name",
    },
    {
        id: "surname",
        numeric: false,
        disablePadding: true,
        label: "Surname",
    },
];

function EnhancedTableHead(props) {
    const {
        classes,
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props;

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ "aria-label": "select all desserts" }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "default"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={order}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === "desc"
                                        ? "sorted descending"
                                        : "sorted ascending"}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === "light"
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: "1 1 100%",
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected, handelDelete, handelConfirm } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography
                    className={classes.title}
                    color="inherit"
                    variant="subtitle1"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    className={classes.title}
                    variant="h6"
                    id="tableTitle"
                >
                    Select Emails
                </Typography>
            )}

            {numSelected > 0 ? (
                <>
                    <Tooltip title="Delete">
                        <IconButton aria-label="delete" onClick={handelDelete}>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Confirm">
                        <IconButton aria-label="delete" onClick={handelConfirm}>
                            <CheckIcon/>
                        </IconButton>
                    </Tooltip>
                </>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton aria-label="filter list">
                        <FilterListIcon/>
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(3),
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    tableWrapper: {
        overflowX: "auto",
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1,
    },
}));

export default function ConfirmProfile() {
    const classes = useStyles();
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("calories");
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [data, setData] = useState(DataService?.getConfirmedProfiles?.getValue() || []);
    const [isLoading, setIsLoading] = useState(false);
    const { setOpen, setType } = useContext(modalContext);
    const { UNIVERSITY } = USER_TYPE || {};
    let pathName = window.location.pathname;

    const getInitialData = () => {
        setIsLoading(true);
        if (pathName.includes(UNIVERSITY.toLowerCase())) {
            DataService.getJson(ENDPOINT_URLS[UNIVERSITY_CONFIRM_PROFILES]).then(val => {
                const { data } = val;
                const filteredData = data.filter(el => el.userRole === 'User' && el.userType == 'University');
                const currentData = filteredData?.map(el => createData(el.email, el?.name, el?.surName));
                currentData.length > 5 && setRowsPerPage(10);
                DataService?.getConfirmedProfiles?.next(currentData);
                setData(DataService?.getConfirmedProfiles?.getValue());
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
                const filteredData = data.filter(el => el.userRole === 'User' && el.userType == 'Company');
                const companyCurrentData = filteredData.map(el => createData(el.email, el?.name, el?.surName));
                companyCurrentData.length > 5 && setRowsPerPage(10);
                DataService?.getConfirmedProfiles?.next(companyCurrentData);
                setData(DataService?.getConfirmedProfiles?.getValue());
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

    const handleConfirm = () => {
        if (pathName.includes(UNIVERSITY.toLowerCase())) {
            DataService.postJson(ENDPOINT_URLS[CONFIRMED_UNIVERSITY_USER], selected).then(_ => {
                toast.success(
                    CONFIRM_SUCCESS, {
                        type: toast.TYPE.SUCCESS,
                        icon: true,
                        theme: 'dark'
                    });
                getInitialData();
                setSelected([]);
            }).catch(_ => {
                toast.error(
                    ERROR_CONFIRM, {
                        type: toast.TYPE.ERROR,
                        icon: true,
                        theme: 'dark'
                    }
                );
            });
        } else {
            DataService.postJson(ENDPOINT_URLS[CONFIRMED_COMPANY_USER], selected).then(_ => {
                toast.success(
                    CONFIRM_SUCCESS, {
                        type: toast.TYPE.SUCCESS,
                        icon: true,
                        theme: 'dark',
                    });
                getInitialData();
                setSelected([]);
            }).catch(_ => {
                toast.error(
                    ERROR_CONFIRM, {
                        type: toast.TYPE.ERROR,
                        icon: true,
                        theme: 'dark',
                    }
                );
            });
        }
    };

    const handleDeleteUser = () => {
        DataService.userForDelete.next({
            email: selected,
            state: setData,
        });
        setType(DELETE_EMAILS);
        setOpen(true);
    };
    useEffect(() => {
        setSelected([]);
    }, [data]);

    const handleRequestSort = (event, property) => {
        const isDesc = orderBy === property && order === "desc";
        setOrder(isDesc ? "asc" : "desc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = data.map((n) => n.email);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
        <>{!isLoading ? (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <EnhancedTableToolbar
                        numSelected={selected?.length}
                        handelDelete={handleDeleteUser}
                        handelConfirm={handleConfirm
                        }/>
                    <div className={classes.tableWrapper}>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={dense ? "small" : "medium"}
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected?.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={data?.length}
                            />
                            <TableBody>
                                {stableSort(data, getSorting(order, orderBy))
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row?.email);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) =>
                                                    handleClick(event, row?.email)
                                                }
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row?.email}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            "aria-labelledby":
                                                            labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    {row?.email}
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    {row?.name}
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    {row?.surName}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6}/>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data?.length < 0 ? 0 : data?.length}
                        rowsPerPage={rowsPerPage}
                        page={page < 0 ? 0 : page}
                        SelectProps={{
                            inputProps: {
                                'aria-label': 'rows per page',
                            },
                            native: true,
                        }}
                        backIconButtonProps={{
                            "aria-label": "previous page",
                        }}
                        nextIconButtonProps={{
                            "aria-label": "next page",
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        ) : <CircularProgress/>}</>
    );
}
