import axios from 'axios';
import fileDownload from 'js-file-download';
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { toast } from 'react-toastify';
import configs from '../../configs/mainConfigs';
import {
    ENDPOINT_URLS,
    USER_MATERIALS,
    DELETE_FILE,
    DOWNLOAD_FILE,
    EDIT_FILE_NAME,
    INPUT_SEARCH,
} from '../../constants/api.constants';
import { DELETE_YOUR_FILE, EDITED_YOUR_FILE, GLOBAL_ERROR } from '../../constants/messages.constants';
import DataService from '../../services/dataService';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import VisibilityIcon from '@mui/icons-material/Visibility';

import './myFiles.css';

const useStyles = makeStyles(theme => ({
    root: {
        width: "650px",
        marginTop: theme.spacing(3),
        margin: '0 auto',
        overflowX: "auto"
    },
    table: {
        minWidth: 650
    },
    selectTableCell: {
        width: 60
    },
    tableCell: {
        width: 130,
        height: 40
    },
    input: {
        width: 130,
        height: 40
    }
}));

const createData = (currentFileName, userId, fileType) => ({
    id: currentFileName,
    currentFileName,
    userId,
    fileType,
    // calories,
    // fat,
    // carbs,
    // protein,
    isEditMode: false
});

const CustomTableCell = ({ row, name, onChange }) => {
    const classes = useStyles();
    const { isEditMode } = row;
    return (
        <TableCell align="left" className={classes.tableCell}>
            {isEditMode ? (
                <Input
                    value={row[name]}
                    name={name}
                    onChange={e => onChange(e, row)}
                    className={classes.input}
                />
            ) : (
                row[name]
            )}
        </TableCell>
    );
};

const MyFiles = ({ isSearch = false, searchData = [], val = '' }) => {
    const [rows, setRows] = React.useState([]);
    const [previous, setPrevious] = React.useState({});
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    const onToggleEditMode = id => {
        setRows(state => {
            return rows.map(row => {
                if (row.id === id) {
                    return { ...row, isEditMode: !row.isEditMode };
                }
                return row;
            });
        });
    };

    const onChange = (e, row) => {
        if (!previous[row.id]) {
            setPrevious(state => ({ ...state, [row.id]: row }));
        }
        const value = e.target.value;
        const name = e.target.name;
        const { id } = row;
        const newRows = rows.map(row => {
            if (row.id === id) {
                return { ...row, [name]: value };
            }
            return row;
        });
        setRows(newRows);
    };

    const onRevert = id => {
        const newRows = rows.map(row => {
            if (row.id === id) {
                return previous[id] ? previous[id] : row;
            }
            return row;
        });
        setRows(newRows);
        setPrevious(state => {
            delete state[id];
            return state;
        });
        onToggleEditMode(id);
    };

    const getInitialUserFiles = () => {
        DataService.getJson(ENDPOINT_URLS[USER_MATERIALS]).then(val => {
            const { data } = val;
            setTableData(data);
            setRows((_) => data.map(el => {
                const currentName = el?.fileName?.split(el?.fileType.trim());
                return createData(currentName[0], el?.userId, el?.fileType);
            }));
        });
    };

    useEffect(() => {
        if (isSearch && searchData) {
            setRows((_) => searchData.map(el => {
                const currentName = el?.fileName?.split(el?.fileType.trim());
                return createData(currentName[0], el?.userId, el?.fileType);
            }));
        }
    }, []);

    useEffect(() => {
        if (!isSearch) {
            getInitialUserFiles();
        }
    }, []);

    const handelDeleteFile = (row) => {
        const file = tableData.find(el => el?.fileName === `${row?.id}${row?.fileType}`);
        DataService.postJson(ENDPOINT_URLS[DELETE_FILE], {
            fileId: file?.fileId,
            fileName: file?.fileName,
        }).then(_ => {
            toast.success(DELETE_YOUR_FILE, {
                type: toast.TYPE.SUCCESS,
                icon: true,
                theme: "dark",
            });
            getInitialUserFiles();
        }).catch(_ => {
            toast.error(GLOBAL_ERROR, {
                type: toast.TYPE.ERROR,
                icon: true,
                theme: "dark",
            });
        });
    };
    const handelEditedUserFileName = (row = {}) => {
        const fileId = row?.id;
        const file = tableData.find(el => el?.fileName === `${fileId}${row?.fileType}`);
        DataService.postJson(ENDPOINT_URLS[EDIT_FILE_NAME], {
            fileName: `${fileId}${row.fileType}`,
            newFileName: `${row?.currentFileName}${row?.fileType}`,
        }).then(_ => {
            toast.success(EDITED_YOUR_FILE, {
                type: toast.TYPE.SUCCESS,
                icon: true,
                theme: "dark",
            });
            getInitialUserFiles();
        }).catch(_ => {
            toast.error(GLOBAL_ERROR, {
                type: toast.TYPE.ERROR,
                icon: true,
                theme: "dark",
            });
            getInitialUserFiles();
        });
    };


    return (
        <Paper className={classes.root}>
            <Table className={classes.table} aria-label="caption table">
                <caption>Your All file names</caption>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Actions</TableCell>
                        <TableCell align="left">Your File names</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id + row.fileType}>
                            <TableCell className={classes.selectTableCell}>
                                {row.isEditMode ? (
                                    <>
                                        <span className="icon-btn" onClick={() => {
                                            handelEditedUserFileName(row);
                                            onToggleEditMode(row.id);
                                        }}><DoneIcon color="success"/></span>
                                        <span className="icon-btn" onClick={() => {
                                            onRevert(row.id);
                                            getInitialUserFiles();
                                        }}><DoNotDisturbIcon color={'error'}/></span>
                                    </>
                                ) : (
                                    <>
                                        {isSearch ? <></> : (
                                            <>
                                                <span className="icon-btn" onClick={() => {
                                                    onToggleEditMode(row.id);
                                                }}><EditIcon color={'info'}/></span>
                                                <span className="icon-btn" onClick={() => {
                                                    handelDeleteFile(row);
                                                }}> <DeleteForeverIcon color="error"/></span>

                                            </>
                                        )}
                                        <span className="icon-btn" onClick={() => {
                                            toast.info('Wait for download fiel', {
                                                type: toast.TYPE.INFO,
                                                icon: true,
                                                theme: "dark",
                                            });
                                        }}>  <a
                                                href={`http://www.taceesmplatform.com/File/DownloadFile?filename=${row?.id}${row?.fileType.trim()}&usrId=${row?.userId}`}
                                                download
                                                target="_blank" rel="noreferrer"
                                            >
                                                <DownloadForOfflineIcon color="warning"/>
                                            </a></span>
                                        <span className="icon-btn" onClick={() => {
                                        }}>  <VisibilityIcon color="secondary"/></span>

                                    </>
                                )}
                            </TableCell>
                            <CustomTableCell {...{ row, name: "currentFileName", onChange }} />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default MyFiles;
