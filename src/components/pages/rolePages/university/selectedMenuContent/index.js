import React from 'react';
import { CONTENT_TYPE, MATERIALS_TYPE, rightSideItemsName, USER_TYPE } from '../../../../../constants/ui.constants';
import UserForm from '../../../../auth/pieces/formsForUserTypes/userForm';
import MyFiles from '../../../../myFiles';
import Announcement from '../../../../sharedComponents/Announcements';
import ConfirmProfile from '../../confirmProfile';
import Materials from '../../materials';
import ConfirmCompanyMember from '../confirmCompanyMember';
import ConfirmMember from '../confirmMember';

const SelectedMenuContent = ({ type = '', setClickType, clickMaterialTYpe, setClickMaterialType, clickType }) => {
    const { UPLOAD_FILE, MY_FILES } = MATERIALS_TYPE;
    const { MATERIALS, PROFILE, CONFIRM_USER } = CONTENT_TYPE;

    switch (type) {
        case rightSideItemsName.PROFILE: {
            return (
                <>
                    <UserForm isAllContent={true} inUniversity={true} editUserInfo={{
                        name: USER_TYPE?.UNIVERSITY, isEdit: true,
                    }}
                    setClickType={setClickType}
                    />
                </>
            );
        }
        case rightSideItemsName.MATERIALS: {
            return (
                <>
                    <div className="materials-btn">
                        <button
                            className={clickMaterialTYpe && clickMaterialTYpe === UPLOAD_FILE ? 'active-material-btn' : 'material-btn'}
                            onClick={() => setClickMaterialType(UPLOAD_FILE)}
                            disabled={clickMaterialTYpe === UPLOAD_FILE}
                        >
                            Upload File
                        </button>
                        <button
                            className={clickMaterialTYpe && clickMaterialTYpe === MY_FILES ? 'active-material-btn' : 'material-btn'}
                            onClick={() => setClickMaterialType(MY_FILES)}
                            disabled={clickMaterialTYpe === MY_FILES}
                        >
                            My Files
                        </button>
                    </div>
                    {clickMaterialTYpe && (
                        <div className="material-content">
                            {clickMaterialTYpe && clickMaterialTYpe === UPLOAD_FILE ? (
                                <Materials/>
                            ) : (clickMaterialTYpe && clickMaterialTYpe === MY_FILES) ? <>
                                <MyFiles/></> : null}
                        </div>
                    )}
                </>
            );
        }
        case rightSideItemsName.CONFIRM_PROFILE : {
            return <ConfirmProfile />;
        }
        case rightSideItemsName.CONFIRM_MEMBER : {
            return (
                <>
                    <div>
                        <h1>Members</h1>
                        <ConfirmMember />
                    </div>
                </>
            );
        }
        case rightSideItemsName.ANNOUNCEMENTS: {
            return <Announcement />;
        }
        default :
            return null;

    }
};

export default SelectedMenuContent;
