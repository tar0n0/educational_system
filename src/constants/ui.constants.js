import { makeStyles } from '@material-ui/core/styles';

export const CONTENT_TYPE = {
    MATERIALS: 'materials',
    PROFILE: 'profile',
    CONFIRM_USER: 'confirm-user',
};

export const MATERIALS_TYPE = {
    UPLOAD_FILE: 'upload-file',
    MY_FILES: 'my-file',
};

export const USER_TYPE = {
    UNIVERSITY: 'UNIVERSITY',
    COMPANY: 'COMPANY',
    USER: 'USER',
};

export const CATEGORY_UNIVERSITY = {
    TEACHER: 1,
    STUDENT: 2,
};

export const useStyles = makeStyles((theme) => ({
    formWrapper: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(8),
    },
}));


export const toastProps = {
    type: {
        success: {
            title: 'Successfully done',
        },
        danger: {
            title: 'Something went wrong',
        },
        info: {
            title: 'Information',
        },
        warning: {
            title: 'Something is wrong',
        },
    },
    default: {
        type: 'success',
        container: 'top-right',
        animationIn: ['reveal'],
        animationOut: ['hide'],
        width: 336,
        dismiss: {
            click: true,
            duration: 3000,
            onScreen: false,
            pauseOnHover: true,
            showIcon: true,
        },
    },
};

export const USER_ROLES = {
    [USER_TYPE.UNIVERSITY]: 1,
    [USER_TYPE.COMPANY]: 2,
    [USER_TYPE.USER]: 3,
};

export const SubMenuTypes = {
    ANNOUNCEMENT_FOR_PAGE: 'ANNOUNCEMENT_FOR_PAGE',
    ANNOUNCEMENT_FOR_ACCOUNT: 'ANNOUNCEMENT_FOR_ACCOUNT',
    COURSES_FOR_PAGE: 'COURSES_FOR_PAGE',
    COURSES_FOR_ACCOUNT: 'COURSES_FOR_ACCOUNT',
    CONTENT_TYPE_FOR_COURSES: 'CONTENT_TYPE_FOR_COURSES',
    CONTENT_TYPE_FOR_ANNOUNCEMENT: 'CONTENT_TYPE_FOR_ANNOUNCEMENT',
};

export const rightSideItemsName = {
    PROFILE: 'Profile',
    MATERIALS: 'Materials',
    ANNOUNCEMENTS: 'Announcements',
    NEWS: 'News',
    COURSES: 'Courses',
    CONFIRM_PROFILE: 'Confirm User',
    CONFIRM_MEMBER: 'Confirm Member'
};
