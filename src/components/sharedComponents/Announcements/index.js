import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { createGuid } from '../../../utils/helpers';
import { ENDPOINT_URLS, GET_MY_ANNOUNCEMENTS, DELETE_ANNOUNCEMENT } from '../../../constants/api.constants';
import { DELETE_THIS_ANNOUNCEMENT } from '../../../constants/messages.constants';
import { SubMenuTypes } from '../../../constants/ui.constants';
import { modalContext } from '../../../context/modalContext';
import DataService from '../../../services/dataService';
import './style.css';

const Announcement = () => {
    const { setOpenDialog } = useContext(modalContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        DataService.getJson(ENDPOINT_URLS[GET_MY_ANNOUNCEMENTS]).then(val => setData(val?.data));
    }, []);

    useEffect(() => {
        DataService.getJson(ENDPOINT_URLS[GET_MY_ANNOUNCEMENTS]).then(val => setData(val?.data));
    }, [DataService.isUpdatedData.getValue()]);

    const handelDeleteAnnouncement = (announcementId) => {
        DataService.postJson(ENDPOINT_URLS[DELETE_ANNOUNCEMENT](announcementId)).then(_ => {
            toast.success(
                DELETE_THIS_ANNOUNCEMENT, {
                    type: toast.TYPE.SUCCESS,
                    icon: true,
                    theme: 'dark',
                }
            );
        });
    };

    return (
        <>
            <div className="new-announcement">
                <Button
                    className="announcement-btn-1"
                    variant="contained"
                    onClick={() => {
                        setOpenDialog(true);
                        DataService.getSubMenuType.next(SubMenuTypes.ANNOUNCEMENT_FOR_ACCOUNT);
                    }}
                >
                    Add Announcement
                </Button>
            </div>
            {data?.length ? (
                <>
                    {data?.map(el => {
                        const guid = createGuid();
                        return (
                            <>
                                {el?.content?.length && (
                                    <div key={guid} className="posts">
                                        <h2 className="title-announcement">{el?.title}</h2>
                                        {el?.content.substring(1, 300)}
                                        <p className="style-6" onClick={() => {
                                            DataService.getAnnouncement.next(el);
                                            DataService.getSubMenuType.next(SubMenuTypes.CONTENT_TYPE_FOR_ANNOUNCEMEN);
                                            setOpenDialog(true);
                                        }}>Read More</p>
                                        <p className='author-for-courses-and-announcement'>Author:: {el?.authorName} {el?.authorSurName}</p>
                                    </div>
                                )}
                            </>
                        );
                    })}
                </>
            ) : (
                <>
                    <h1>Announcements</h1>
                </>
            )}
        </>
    );
};

export default Announcement;
