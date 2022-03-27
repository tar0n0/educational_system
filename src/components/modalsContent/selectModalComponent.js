import { DELETE_EMAILS, USER_TYPES_FOR_MODAL } from '../../constants/modals.constat';
import DeleteEmails from './pieces/deleteEmails';
import UserType from './pieces/signUpTypes';

const SelectedModalComponent = ({ type, setOpen }) => {
    switch (type) {
        case USER_TYPES_FOR_MODAL:
            return <UserType/>;
        case DELETE_EMAILS:
            return <DeleteEmails />;
        default:
            return <></>;
    }
};
export default SelectedModalComponent;
