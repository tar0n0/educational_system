import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { toast } from 'react-toastify';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

const useStyles = makeStyles(theme => ({
    root: {
        width: 650,
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
});

const CustomTableCell = ({ row, name }) => {
    const classes = useStyles();
    return (
        <TableCell align="left" className={classes.tableCell}>
            {row[name] && row[name]}
        </TableCell>
    );
};

const ExtendedFiles = ({ data }) => {
    const [rows, setRows] = React.useState(data || []);
    const classes = useStyles();

    // useEffect(() => {
    //     const currentData = data.map((el, idx) => {
    //         const currentName = el?.fileName?.split(el?.fileType.trim());
    //         return createData(currentName[0], el?.userId, el?.fileType);
    //     });
    //     setRows(currentData);
    // }, []);

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
                    {rows?.length && rows.map(row => (
                        <TableRow key={row.id + row.fileType}>
                            <TableCell className={classes.selectTableCell}>
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

                            </TableCell>
                            {Object.keys(row).some(el => !!row[el]) &&
                                <CustomTableCell {...{ row, name: "currentFileName" }} />}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default ExtendedFiles;
