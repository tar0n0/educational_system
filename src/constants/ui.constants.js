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
