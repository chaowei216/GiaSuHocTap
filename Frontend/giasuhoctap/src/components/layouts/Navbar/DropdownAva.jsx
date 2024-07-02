import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Logout } from '../../../api/AuthenApi';
import useAuth from '../../../hooks/useAuth';

export default function BasicMenu({ anchorEl, handleClick, handleClose, children }) {
    const { logout } = useAuth()
    const handleClickProfile = () => {
        window.location.href = "/personal-profile"
    }
    const handleClickLogout = async () => {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await Logout(refreshToken)
        if (response.ok) {
            await logout();
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
                <MenuItem onClick={() => handleClickProfile()}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={() => handleClickLogout()}>Logout</MenuItem>
            </Menu>
        </div>
    );
}
