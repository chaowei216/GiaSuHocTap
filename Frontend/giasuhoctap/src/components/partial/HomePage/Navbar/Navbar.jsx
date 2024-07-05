import React, { useState } from 'react';
import styles from './Navbar.module.css';
import logo from '../../../../../public/img/logoGiasu2.png';
import useAuth from "../../../../hooks/useAuth"
import BasicMenu from '../../../layouts/Navbar/DropdownAva';
import avatar from "/img/avatar.png";
import { Badge, Button, Stack } from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ProfileMenu from './ProfileMenu';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate()
  const handleClickLogin = () => {
    navigate('/login')
  }
  const handleClickRegister = () => {
    navigate('/registerParents')
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const buttonStyles = {
    backgroundColor: "#e8e8e8",
    borderRadius: '25px',
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    color: "#000",
    transition: 'color 0.2s ease',
    '&:hover': {
      color: "#ff0000 !important",
      fontWeight: "bold",
      border: "none !important",
      backgroundColor: "#e8e8e8",
    },
  };
  const { user, isAuthenticated } = useAuth();
  return (
    <header className={styles.navbarWrapper}>
      <div className={styles.navbarInner}>
        <img src={logo} alt="logo" className={styles.brand} />
      </div>
      <div className={styles.navRight}>
        <div className={styles.navLinksWrapper}>
          <div className={styles.teal}>
            <a href="/" className={`${styles.nav} ${styles.center} ${styles.dropdownToggle}`}>
              TRANG CHỦ
            </a>
            <div className={`${styles.dropdown} ${styles.dropdownWrapper}`} style={{ width: "175px" }}>
              <a href="/" className={`${styles.nav} ${styles.center} ${styles.dropdownToggle}`}>
                PHỤ HUYNH
              </a>
              <div className={styles.dropdownMenu}>
                <a href="/" className={styles.dropdownItem}>Đăng ký tìm gia sư</a>
                <a href="/" className={styles.dropdownItem}>Dịch vụ gia sư</a>
                <a href="/" className={styles.dropdownItem}>Gia sư tiêu biểu</a>
              </div>
            </div>
            <div className={`${styles.dropdown} ${styles.dropdownMenuWrapper}`} style={{ width: "130px" }}>
              <a href="/" className={`${styles.nav} ${styles.center} ${styles.dropdownToggle}`}>
                GIA SƯ
              </a>
              <div className={styles.dropdownMenu}>
                <a href="RegisterTutor" className={styles.dropdownItem}>Đăng ký làm gia sư</a>
                <a href="/" className={styles.dropdownItem}>Hướng dẫn nhận lớp</a>
                <a href="BookTutorOnline" className={styles.dropdownItem}>Danh sách gia sư online</a>
                <a href="BookTutorOffline" className={styles.dropdownItem}>Danh sách gia sư offline</a>
              </div>
            </div>
            <a href="/" className={`${styles.nav} ${styles.center}`}>
              LỚP MỚI
            </a>
            <a href="/" className={`${styles.nav} ${styles.center}`}>
              TUYỂN DỤNG
            </a>
            <a href="/buycoin" className={`${styles.nav} ${styles.center}`}>
              MUA COIN
            </a>
          </div>
        </div>
        {(!isAuthenticated) && (
          <div className={styles.nav_info}>
            <button onClick={() => handleClickLogin()} className={styles.login}>Đăng nhập</button>
            <button onClick={() => handleClickRegister()} className={styles.signup}>Đăng ký</button>
          </div>
        )}
        {(user && isAuthenticated) && (
          <div className={styles.nav_info}>
            <Stack sx={{ marginRight: "20px" }} spacing={2} direction="row">
              <Badge badgeContent={10} color="default" showZero>
                <NotificationsNoneOutlinedIcon color="white" />
              </Badge>
            </Stack>
            <Button variant='outlined' color='error' sx={buttonStyles}>
              <AddOutlinedIcon /> 0 đ
            </Button>
            <ProfileMenu />
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
