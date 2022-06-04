import Button from '@mui/material/Button';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ENDPOINT_URLS, GET_MY_COURSES, DELETE_COURSES } from '../../../constants/api.constants';
import { DELETE_THIS_COURSE } from '../../../constants/messages.constants';
import { SubMenuTypes } from '../../../constants/ui.constants';
import { modalContext } from '../../../context/modalContext';
import DataService from '../../../services/dataService';
import { createGuid } from '../../../utils/helpers';

// import './style.css';

const Courses = () => {
    const { setOpenDialog } = useContext(modalContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        DataService.getJson(ENDPOINT_URLS[GET_MY_COURSES]).then(val => setData(val?.data));
    }, []);

    useEffect(() => {
        DataService.getJson(ENDPOINT_URLS[GET_MY_COURSES]).then(val => setData(val?.data));
    }, [DataService.isUpdatedData.getValue()]);

    const handelDeleteCourse = (courseID) => {
        DataService.postJson(ENDPOINT_URLS[DELETE_COURSES](courseID)).then(_ => {
            toast.success(
                DELETE_THIS_COURSE, {
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
                        DataService.getSubMenuType.next(SubMenuTypes.COURSES_FOR_ACCOUNT);
                    }}
                >
                    Add Courses
                </Button>
            </div>
            {data?.length ? (
                <>
                    {data?.map(el => {
                        const guid = createGuid();
                        return (
                            <>
                                {el?.content?.length && (
                                    <div className="posts" key={guid}>
                                        <h2 className="title-announcement">{el?.title}</h2>
                                        {el?.content.substring(1, 300)}
                                        <p className="style-6" onClick={() => {
                                            DataService.getCourses.next(el);
                                            DataService.getSubMenuType.next(SubMenuTypes.CONTENT_TYPE_FOR_COURSES);
                                            setOpenDialog(true);
                                        }}>All Content</p>
                                        <p className="author-for-courses-and-announcement">Author:: {el?.authorName} {el?.authorSurName}</p>
                                    </div>
                                )}
                            </>
                        );
                    })}
                </>
            ) : (
                <>
                    <h1>Courses</h1>
                </>
            )}
        </>
    );
};

export default Courses;
