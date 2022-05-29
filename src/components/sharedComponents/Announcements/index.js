import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
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
                        return (
                            <>
                                {el?.content?.length && (
                                    <div className="posts">
                                        <p className='delete-announcement-or-course' onClick={() => handelDeleteAnnouncement(el?.id)}>
                                            <ClearIcon color="error" fontSize={"large"} />
                                        </p>
                                        <h2 className="title-announcement">{el?.title}</h2>
                                        {el?.content.substring(1, 300)}
                                        <p className="style-6" onClick={() => {
                                            DataService.getAnnouncement.next(el);
                                            DataService.getSubMenuType.next(SubMenuTypes.ANNOUNCEMENT_FOR_ACCOUNT);
                                            setOpenDialog(true);
                                        }}>Read More</p>
                                    </div>
                                )}
                            </>
                        );
                    })}
                </>
            ) : (
                <>
                    <h1>Announcements</h1>
                    <div className="posts">
                        <h2 className="title-announcement">Read More</h2>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar lacus id
                        urna sagittis
                        egestas.
                        Mauris id bibendum purus, vestibulum tristique mauris. Nullam dapibus sem non nulla
                        lobortis,
                        vitae
                        blandit sem volutpat. Integer fringilla aliquet nulla eu aliquam. Donec euismod
                        scelerisque mi
                        quis
                        lobortis.<br/><br/> Aliquam convallis risus ligula, non pellentesque dolor hendrerit
                        id. Nunc
                        facilisis
                        arcu nulla, nec tempus neque scelerisque vel. Donec pharetra dolor eget ullamcorper
                        porta.
                        Suspendisse
                        interdum diam velit, nec porta magna elementum quis. Etiam id suscipit est. Cras
                        rhoncus felis
                        tincidunt
                        lorem rutrum, id vehicula neque scelerisque. Fusce a tempor ipsum, quis accumsan
                        nisl.

                        <a href="#" className="style-6">Read More</a>
                    </div>
                    <div className="posts">
                        <h2 className="title-announcement">Read More</h2>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar lacus id
                        urna sagittis
                        egestas.
                        Mauris id bibendum purus, vestibulum tristique mauris. Nullam dapibus sem non nulla
                        lobortis,
                        vitae
                        blandit sem volutpat. Integer fringilla aliquet nulla eu aliquam. Donec euismod
                        scelerisque mi
                        quis
                        lobortis.<br/><br/> Aliquam convallis risus ligula, non pellentesque dolor hendrerit
                        id. Nunc
                        facilisis
                        arcu nulla, nec tempus neque scelerisque vel. Donec pharetra dolor eget ullamcorper
                        porta.
                        Suspendisse
                        interdum diam velit, nec porta magna elementum quis. Etiam id suscipit est. Cras
                        rhoncus felis
                        tincidunt
                        lorem rutrum, id vehicula neque scelerisque. Fusce a tempor ipsum, quis accumsan
                        nisl.
                        <a href="#" className="style-6">Read More</a>
                    </div>
                </>
            )}
        </>
    );
};

export default Announcement;
