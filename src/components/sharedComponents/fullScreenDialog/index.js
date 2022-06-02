import { useContext, useEffect, useState } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { toast } from 'react-toastify';

import { ENDPOINT_URLS, ADD_NEW_ANNOUNCEMENT, ADD_NEW_COURSES, UPLOAD_FILE } from '../../../constants/api.constants';
import {
    ANNOUNCEMENT_SUCCESS,
    COURSES_SUCCESS,
    EMPTY_CONTENT_FOR_ANNOUNCEMENT, EMPTY_CONTENT_FOR_COURSES,
} from '../../../constants/messages.constants';
import { SubMenuTypes } from '../../../constants/ui.constants';
import { modalContext } from '../../../context/modalContext';

import './style.css';
import DataService from '../../../services/dataService';
import { getStorageItem } from '../../../storage';
import { parseJwt } from '../../../utils/helpers';
import UploadInput from '../uploadedFile';
import ExtraComponent from './extraComponent';
import ClearIcon from '@mui/icons-material/Clear';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = () => {
    const { setOpenDialog, openDialog } = useContext(modalContext);
    const [reRender, setReRender] = useState(false);
    const [createdData, setCreatedData] = useState({
        title: '',
        content: '',
        userId: parseJwt(getStorageItem('user')?.token)?.UserId,
        fileIds: [],
    });
    const [file, setFile] = useState('');
    const [fileIds, setFileIds] = useState('');

    useEffect(() => {
        if (file) {
            const formData = new FormData();
            formData.append('files', file);
            formData.append('FileVersion', 1);
            DataService.postJson(ENDPOINT_URLS[UPLOAD_FILE], formData).then(val => {
                const id = val.substring(val?.indexOf('id=') + 3);
                setFileIds(() => id);
            });
        }
    }, [file]);

    const handelChangeCreatedData = (key = '', value = '') => {
        setCreatedData(() => ({
            ...createdData,
            [key]: value,
        }));
    };

    const handelClickOpen = () => setOpenDialog(true);
    
    const handelClickClose = () => {
        setOpenDialog(false);
        DataService.getAnnouncement.next({});
        DataService.getCourses.next({});
        DataService.getSubMenuType.next('');
        DataService.getContentType.next('');
        DataService.isUpdatedData.next(!DataService.isUpdatedData.getValue());
        setReRender(!reRender);
        DataService.getAnnouncement.next({});
        DataService.getCourses.next({});
        DataService.getSubMenuType.next('');
    };

    const handelCreateNewAnnouncement = (values) => {
        if (!values?.content) {
            console.log(2);
            toast.info(DataService.getSubMenuType.getValue() === SubMenuTypes.ANNOUNCEMENT_FOR_ACCOUNT ? EMPTY_CONTENT_FOR_ANNOUNCEMENT : EMPTY_CONTENT_FOR_COURSES, {
                type: toast.TYPE.INFO,
                theme: "dark",
            });
        } else {
            const url = DataService.getSubMenuType.getValue() === SubMenuTypes.ANNOUNCEMENT_FOR_ACCOUNT ? ENDPOINT_URLS[ADD_NEW_ANNOUNCEMENT] : ENDPOINT_URLS[ADD_NEW_COURSES];
            values?.content && DataService.postJson(url, {
                ...values,
                ...(fileIds ? { file: [fileIds] } : {}),
            }).then((_) => {
                toast.success(
                    url === ENDPOINT_URLS[ADD_NEW_ANNOUNCEMENT] ? ANNOUNCEMENT_SUCCESS : COURSES_SUCCESS, {
                        type: toast.TYPE.SUCCESS,
                        icon: true,
                        theme: 'dark',
                    }
                );
            });
        }
    };

    return (
        <div>
            <Dialog
                fullScreen
                open={openDialog}
                onClose={handelClickClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handelClickClose}
                            aria-label="close"
                        >
                            <CloseIcon/>
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {DataService.getAnnouncement.getValue()?.content || DataService.getCourses.getValue()?.content ? 'Read all content' : DataService.getSubMenuType.getValue() === SubMenuTypes.ANNOUNCEMENT_FOR_PAGE || DataService.getSubMenuType.getValue() === SubMenuTypes.ANNOUNCEMENT_FOR_ACCOUNT ? 'Create New Announcement' : 'Create New Courses'}
                        </Typography>
                        <Button autoFocus color="inherit" onClick={() => {
                            (!DataService.getAnnouncement.getValue()?.content && !DataService.getCourses.getValue()?.content) && handelCreateNewAnnouncement(createdData);
                            handelClickClose();
                            DataService.getAnnouncement.next({});
                            DataService.getCourses.next({});
                            DataService.getSubMenuType.next('');
                        }}>
                            {DataService.getAnnouncement.getValue()?.content || DataService.getCourses.getValue()?.content ? 'Close' : 'Create'}
                        </Button>
                    </Toolbar>
                </AppBar>
                {DataService.getAnnouncement.getValue()?.content || DataService.getCourses.getValue()?.content ? (
                    <><ExtraComponent handelClickClose={handelClickClose}/></>
                ) : (
                    <>
                        <form className="form-for-entry">
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1" className="label-for-ann">Title </label>
                                <input type="text" className="form-control form-ann-lo" id="exampleFormControlInput1"
                                    placeholder="Please write title"
                                    onChange={(e) => handelChangeCreatedData('title', e?.target?.value)}/>
                            </div>
                            <div className="form-group announcemnt-for-enter">
                                <label htmlFor="exampleFormControlTextarea1"
                                    className="label-for-ann">{DataService.getSubMenuType.getValue() === SubMenuTypes.ANNOUNCEMENT_FOR_ACCOUNT ? 'Announcement text' : 'About Courses'}</label>
                                <textarea className="form-control form-ann-lo" id="exampleFormControlTextarea1" rows="3"
                                    placeholder="Please write text"
                                    onChange={(e) => handelChangeCreatedData('content', e?.target?.value)}></textarea>
                            </div>
                            {DataService.getSubMenuType.getValue() === SubMenuTypes.COURSES_FOR_ACCOUNT && (
                                <>
                                    <label htmlFor="exampleFormControlInput1" className="label-for-ann">Upload
                                        File </label>
                                    <div className="container-uploaded-file">
                                        {file ? <div className="uploaded-file"
                                            title={file?.name}>{file?.name}</div> : (
                                            <UploadInput
                                                className={'pdfInput'}
                                                accept={
                                                    'image/*,.pdf, .word,.doc,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.documen'
                                                }
                                                setFile={setFile}
                                            />
                                        )}
                                        <span className="uploaded-icon">{file &&
                                            <ClearIcon color="error" fontSize={"large"}
                                                onClick={() => setFile('')}/>}</span>
                                    </div>
                                </>
                            )}
                        </form>
                    </>
                )}
            </Dialog>
        </div>
    );
};

export default FullScreenDialog;
