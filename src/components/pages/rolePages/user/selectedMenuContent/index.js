import React from 'react';
import { CONTENT_TYPE, MATERIALS_TYPE, rightSideItemsName } from '../../../../../constants/ui.constants';
import MyFiles from '../../../../myFiles';
import EditProfileInfo from '../../../../sharedComponents/editProfileInfo';
import ConfirmProfile from '../../confirmProfile';
import Materials from '../../materials';

const SelectedMenuContent = ({ type = '', setClickType, clickMaterialTYpe, setClickMaterialType, clickType }) => {
    const { UPLOAD_FILE, MY_FILES } = MATERIALS_TYPE;
    const { MATERIALS, PROFILE, CONFIRM_USER } = CONTENT_TYPE;

    switch (type) {
        case rightSideItemsName.PROFILE: {
            return (
                <>
                    <EditProfileInfo/>
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
            return <ConfirmProfile/>;
        }
        default :
            return null;

    }
};

export default SelectedMenuContent;
