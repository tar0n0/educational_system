import ClearIcon from '@mui/icons-material/Clear';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { ENDPOINT_URLS, DELETE_COURSES, DELETE_ANNOUNCEMENT } from '../../../../constants/api.constants';
import { DELETE_THIS_ANNOUNCEMENT, DELETE_THIS_COURSE } from '../../../../constants/messages.constants';
import { SubMenuTypes } from '../../../../constants/ui.constants';
import EditIcon from '@mui/icons-material/Edit';
import DataService from '../../../../services/dataService';
import { getStorageItem } from '../../../../storage';
import { parseJwt } from '../../../../utils/helpers';
import UploadInput from '../../uploadedFile';

const ExtraComponent = ({ handelClickClose }) => {
    const data = !DataService.getAnnouncement.getValue()?.content ? DataService.getCourses.getValue() : DataService.getAnnouncement.getValue();
    const [file, setFile] = useState('');
    const [isEdited, setIsEdited] = useState(false);

    const [createdData, setCreatedData] = useState({
        title: data?.title || '',
        content: data?.title || '',
        userId: parseJwt(getStorageItem('user')?.token)?.UserId,
        file: null,
    });

    const handelChangeCreatedData = (key = '', value = '') => {
        setCreatedData(() => ({
            ...createdData,
            [key]: value,
        }));
    };

    const handelDeleteFile = (id) => {
        console.log('this id is deleted');
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
    console.log(createdData?.content);
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
                                            onClick={() => handelEditeFile(data?.id)}/>
                                    </p>
                                </>
                            )}</p>
                            <h2 className="title-announcement">{data?.title}</h2>
                            {data?.content}
                            {/*<a href="#" className="style-6">Read More</a>*/}
                            <br/><br/><br/>
                            <p>Author:: {data?.authorName} {data?.authorSurName}</p>
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
            </>
        );
    } else {
        return null;
    }
};

export default ExtraComponent;
