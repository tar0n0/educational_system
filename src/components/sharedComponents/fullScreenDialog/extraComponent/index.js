import ClearIcon from '@mui/icons-material/Clear';
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import {
    ENDPOINT_URLS,
    DELETE_COURSES,
    DELETE_ANNOUNCEMENT,
    EDIT_MY_COURSES,
    EDIT_MY_ANNOUNCEMENT, UPLOAD_FILE
} from '../../../../constants/api.constants';
import {
    DELETE_THIS_ANNOUNCEMENT,
    DELETE_THIS_COURSE,
    EDITED_THIS_ANNOUNCEMENT,
    EDITED_THIS_COURSES,
    GLOBAL_ERROR
} from '../../../../constants/messages.constants';
import { SubMenuTypes } from '../../../../constants/ui.constants';
import EditIcon from '@mui/icons-material/Edit';
import DataService from '../../../../services/dataService';
import { getStorageItem } from '../../../../storage';
import { parseJwt } from '../../../../utils/helpers';
import UploadInput from '../../uploadedFile';
import FileCourses from '../coursesForShow';

const ExtraComponent = ({ handelClickClose }) => {
    const [data, setData] = useState(!DataService.getAnnouncement.getValue()?.content ? DataService.getCourses.getValue() : DataService.getAnnouncement.getValue());
    const [file, setFile] = useState('');
    const [isEdited, setIsEdited] = useState(false);

    const [createdData, setCreatedData] = useState({
        title: data?.title || '',
        content: data?.content || '',
        userId: parseJwt(getStorageItem('user')?.token)?.UserId,
        fileIds: [],
    });

    useEffect(() => {
        if (file) {
            const formData = new FormData();
            formData.append('files', file);
            formData.append('FileVersion', 1);
            DataService.postJson(ENDPOINT_URLS[UPLOAD_FILE], formData).then(val => {
                const id = val.substring(val?.indexOf('id=') + 3);
                setCreatedData(prev => {
                    return {
                        ...prev,
                        fileIds: [...prev.fileIds, id],
                    };
                });
            });
        }
    }, [file]);

    const handelChangeCreatedData = (key = '', value = '') => {
        setCreatedData(() => ({
            ...createdData,
            [key]: value,
        }));
    };

    const handelDeleteFile = (id) => {
        const url = !DataService.getAnnouncement.getValue()?.content ? ENDPOINT_URLS[DELETE_COURSES](id) : ENDPOINT_URLS[DELETE_ANNOUNCEMENT](id);
        DataService.postJson(url).then(_ => {
            const message = url === ENDPOINT_URLS[DELETE_ANNOUNCEMENT] ? DELETE_THIS_ANNOUNCEMENT : DELETE_THIS_COURSE;
            toast.success(
                message, {
                    type: toast.TYPE.SUCCESS,
                    icon: true,
                    theme: 'dark',
                }
            );
            DataService.isUpdatedData.next(!DataService.isUpdatedData.getValue());
            handelClickClose();
        });
    };

    const handelEditeFile = () => {
        setIsEdited(true);
    };

    const handelSaveContent = (id) => {
        const url = !DataService.getAnnouncement.getValue()?.content ? ENDPOINT_URLS[EDIT_MY_COURSES] : ENDPOINT_URLS[EDIT_MY_ANNOUNCEMENT];
        DataService.postJson(url, {
            ...createdData,
            id: data?.id,
        }).then((_) => {
            const message = url === ENDPOINT_URLS[EDIT_MY_COURSES] ? EDITED_THIS_COURSES : EDITED_THIS_ANNOUNCEMENT;
            toast.success(
                message, {
                    type: toast.TYPE.SUCCESS,
                    icon: true,
                    theme: 'dark',
                }
            );
            setIsEdited(false);
            setData({
                ...createdData,
                id: data?.id
            });
            DataService.isUpdatedData.next(!DataService.isUpdatedData.getValue());
        }).catch(_ => {
            toast.error(
                GLOBAL_ERROR, {
                    type: toast.TYPE.ERROR,
                    icon: true,
                    theme: 'dark',
                }
            );
        });
    };

    if (data?.content) {
        return (
            <>
                {!isEdited ? (
                    <>
                        <div className="posts">
                            <p>{!['courses', 'announcements'].includes(window.location.pathname) && (
                                <>
                                    <p className="delete-announcement-or-course">
                                        <ClearIcon color="error" fontSize={"large"}
                                            onClick={() => handelDeleteFile(data?.id)}/>
                                        <EditIcon color="warning" fontSize={'large'}
                                            onClick={() => handelEditeFile()}/>
                                    </p>
                                </>
                            )}</p>
                            <h2 className="title-announcement">{data?.title}</h2>
                            {data?.content}
                            {/*<a href="#" className="style-6">Read More</a>*/}
                            <br/><br/><br/>
                            <p>Author:: {data?.authorName} {data?.authorSurName}</p>
                        </div>
                        <div>
                            <FileCourses data={data?.fileIDs} />
                        </div>
                    </>
                ) : (
                    <>
                        <form className="form-for-entry">
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1" className="label-for-ann">Title </label>
                                <input type="text" className="form-control form-ann-lo" id="exampleFormControlInput1"
                                    defaultValue={createdData?.title}
                                    placeholder="Please write title"
                                    onChange={(e) => handelChangeCreatedData('title', e?.target?.value)}/>
                            </div>
                            <div className="form-group announcemnt-for-enter">
                                <label htmlFor="exampleFormControlTextarea1"
                                    className="label-for-ann">{DataService.getSubMenuType.getValue() === SubMenuTypes.ANNOUNCEMENT_FOR_ACCOUNT ? 'Announcement text' : 'About Courses'}</label>
                                <textarea className="form-control form-ann-lo" id="exampleFormControlTextarea1" rows="3"
                                    defaultValue={createdData?.content}
                                    placeholder="Please write text"
                                    onChange={(e) => handelChangeCreatedData('content', e?.target?.value)}></textarea>
                            </div>
                            {DataService.getSubMenuType.getValue() === SubMenuTypes.CONTENT_TYPE_FOR_COURSES && window.location.pathname !== '/courses' && (
                                <>
                                    <label htmlFor="exampleFormControlInput1" className="label-for-ann">Upload new
                                        file </label>
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
                            {isEdited && (
                                <p className='icons-for-save-this-content'>
                                    <Button variant={'contained'} onClick={() => setIsEdited(false)}>Cancel</Button>
                                    <Button variant={'contained'}
                                        onClick={() => handelSaveContent(data?.id)}>Save</Button>
                                </p>
                            )}
                        </form>
                    </>
                )}
            </>
        );
    } else {
        return null;
    }
};

export default ExtraComponent;
