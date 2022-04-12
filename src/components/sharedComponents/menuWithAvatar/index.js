import * as React from 'react';
import Box from '@mui/material/Box';
import { COMPANY_PAGE, HOME, UNIVERSITY_PAGE, USER_PAGE } from '../../../constants/pathnames.constants';
import DataService from '../../../services/dataService';
import { getStorageItem, removeStorageItem } from '../../../storage';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { parseJwt } from '../../../utils/helpers';
import AuthorizationService from '../../../services/authorizationService';

export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 60, height: 60, backgroundColor: '#0580e8' }}>{'TG'}</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => {
                    const user = getStorageItem('user');
                    if (user) {
                        switch (user?.role) {
                            case 'Admin': {
                                if (user?.userType === 'Company') {
                                    navigate(COMPANY_PAGE);
                                } else if (user?.userType === 'University') {
                                    navigate(UNIVERSITY_PAGE);
                                }
                                break;
                            }
                            case 'User':
                                navigate(USER_PAGE);
                                break;
                            default:
                                navigate(HOME);
                                break;
                        }
                    }
                }}>
                    My Page
                </MenuItem>
                <Divider/>
                <MenuItem onClick={() => {
                    removeStorageItem('user');
                    AuthorizationService.isUserStatus.next(false);
                    DataService.getUserInfo.next({});
                    window.location.pathname = '/';
                }}>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
