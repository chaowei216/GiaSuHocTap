import * as React from 'react';
import { Avatar, Menu, MenuItem, ListItemIcon, Divider, Tooltip, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import useAuth from '../../../../hooks/useAuth';
import { green } from '@mui/material/colors';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Logout } from '../../../../api/AuthenApi';
import { useNavigate } from 'react-router-dom';
import emptyPicture from "/img/empty.png"
const baseUrl = import.meta.env.VITE_API_HOST;
export default function ProfileMenu() {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { user, logout } = useAuth();
    console.log(user);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavigate = () => {
        if (user?.roleName == "Admin" || user?.roleName == "Moderator") {
            setAnchorEl(null);
            navigate('/dashboard')
        } else if (user?.roleName == "Tutor") {
            setAnchorEl(null);
            navigate('/home-tutor')
        } else {
            setAnchorEl(null);
            navigate('/ParentHistory')
        }
    };

    const handleClickLogout = async () => {
        if (user?.roleName == "Admin") {
            await logout();
            navigate("/")
        }
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await Logout(refreshToken)
        if (response.ok) {
            await logout();
            navigate('/')
        }
    }
    const handleMove = () => {
        if (user?.roleName == "Parents") {
            navigate('/ParentHistoryTransaction')
        } else {
            setAnchorEl(null);
        }
    };
    return (
        <div>
            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar alt={user?.fullname} src={`${baseUrl}/api/Auth/user-image?fileName=${user?.userImage}`} sx={{ width: 60, height: 60 }}></Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                sx={{
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&::before': {
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
                    boxShadow: '0px 2px 8px rgba(0,0,0,0.32)',
                    mt: 1.5,
                    overflow: 'visible',
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <a style={{ display: "flex", borderBottom: ".5px solid #f0f0f0" }}>
                        <img src={`${baseUrl}/api/Auth/user-image?fileName=${user?.userImage}`} style={{ width: "55px", height: "55px", marginRight: "10px" }}
                            onError={(e) => {
                                e.currentTarget.src = emptyPicture;
                            }}>
                        </img>
                        <div style={{ marginBottom: "5px" }}>
                            <h4>{user.fullname}</h4>
                            <p>ID: {user.email}</p>
                            <p>Vai trò: {user.roleName}</p>
                        </div>
                    </a>
                </MenuItem>
                <MenuItem sx={{ gap: "13px" }} onClick={handleNavigate}>
                    <Avatar sx={{ bgcolor: green[500] }} style={{ marginLeft: "12px" }}><AssignmentIcon /></Avatar> Trang quản lý của tôi
                </MenuItem>
                <Divider />
                {user?.roleName == "Parents" && (
                    <MenuItem onClick={handleMove}>
                        <ListItemIcon>
                            <SettingsIcon fontSize="small" />
                        </ListItemIcon>
                        Lịch sử giao dịch
                    </MenuItem>
                )}
                <MenuItem onClick={handleClickLogout}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Đăng xuất
                </MenuItem>
            </Menu>
        </div>
    );
}
