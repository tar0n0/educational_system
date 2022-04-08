import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import {
    ENDPOINT_URLS,
    DELETE_USER,
    UNIVERSITY_CONFIRM_PROFILES,
    COMPANY_CONFIRM_PROFILES
} from '../../../constants/api.constants';
import { DELETE_USER_SUCCESS, GLOBAL_ERROR } from '../../../constants/messages.constants';
import { USER_TYPE } from '../../../constants/ui.constants';

import { modalContext } from '../../../context/modalContext';

import '../style.css';
import DataService from '../../../services/dataService';


function createData(email) {
    return { email };
}

const DeleteEmails = () => {
    const { setOpen } = useContext((modalContext));
    const { UNIVERSITY } = USER_TYPE || {};
    let pathName = window.location.pathname;
    const handelDeleteUser = () => {
        const emailForDelete = DataService.userForDelete.getValue();
        const { email, state } = emailForDelete || {};
        DataService.postJson(ENDPOINT_URLS[DELETE_USER], email).then(_ => {
            if (pathName.includes(UNIVERSITY.toLowerCase())) {
                DataService.getJson(ENDPOINT_URLS[UNIVERSITY_CONFIRM_PROFILES]).then(val => {
                    const { data } = val;
                    const currentData = data.map(el => createData(el));
                    DataService.getConfirmedProfiles.next(currentData);
                    state(currentData);
                });
            } else {
                DataService.getJson(ENDPOINT_URLS[COMPANY_CONFIRM_PROFILES]).then(val => {
                    const { data } = val;
                    const companyCurrentData = data.map(el => createData(el));
                    DataService.getConfirmedProfiles.next(companyCurrentData);
                    state(companyCurrentData);
                });
            }
            toast.success(
                DELETE_USER_SUCCESS, {
                    type: toast.TYPE.SUCCESS,
                    icon: true,
                    theme: 'dark'
                }
            );
        }
        ).catch(_ => {
            toast.error(
                GLOBAL_ERROR, {
                    type: toast.TYPE.ERROR,
                    icon: true,
                    theme: 'dark'
                }
            );
        });
        setOpen(false);
        DataService.userForDelete.next({});
    };

    return (
        <>
            <div>
                <p className="delete-email">Do you want delete this email</p>
                <div className="delete-btn-group">
                    <button onClick={() => setOpen(false)} className="btn-delete-1">Cancel</button>
                    <button onClick={() => handelDeleteUser()} className="btn-delete-2">Delete</button>
                </div>
            </div>
        </>
    );
};

export default DeleteEmails;
