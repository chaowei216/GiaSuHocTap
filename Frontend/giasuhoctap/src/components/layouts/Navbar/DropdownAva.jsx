import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Logout } from '../../../api/AuthenApi';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function BasicMenu({ anchorEl, handleClick, handleClose, children }) {
    const navigate = useNavigate()
    const { logout, user } = useAuth()
    const handleClickProfile = () => {
        if (user?.roleName == "Tutor") {
            navigate("/tutor-profile")
        } else {
            navigate("/personal-profile")
        }
    }
    const handleClickLogout = async () => {
        if (user?.roleName == "Admin") {
            await logout();
            navigate("/")
        }
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await Logout(refreshToken)
        if (response.ok) {
            await logout();
            navigate("/")
        }
    }
    const open = Boolean(anchorEl);
    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {children}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => handleClickProfile()}>Trang cá nhân</MenuItem>
                <MenuItem onClick={() => handleClickLogout()}>Đăng xuất</MenuItem>
            </Menu>
        </div>
    );
}
