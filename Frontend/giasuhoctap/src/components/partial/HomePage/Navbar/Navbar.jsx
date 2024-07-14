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
import NotifyBell from '../Notification/Notification';


import { Link, useNavigate } from 'react-router-dom';
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
    borderRadius: '100px',
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
  const handleClickCoin = () => {
    navigate('/buycoin')
  }
  return (
    <header className={styles.navbarWrapper}>
      <div className={styles.navbarInner}>
        <img src={logo} alt="logo" className={styles.brand} />
      </div>
      <div className={styles.navRight}>
        <div className={styles.navLinksWrapper}>
          <div className={styles.teal}>
            <Link to="/" className={`${styles.nav} ${styles.center} ${styles.dropdownToggle}`}>
              TRANG CHỦ
            </Link>
            <div className={`${styles.dropdown} ${styles.dropdownWrapper}`} style={{ width: "175px" }}>
              <a className={`${styles.nav} ${styles.center} ${styles.dropdownToggle}`}>
                PHỤ HUYNH
              </a>
              <div className={styles.dropdownMenu}>
                <Link to="/" className={styles.dropdownItem}>Đăng ký tìm gia sư</Link>
                <Link to="/ParentPage" className={styles.dropdownItem}>Cập nhật hồ sơ</Link>
                <Link to="/" className={styles.dropdownItem}>Gia sư tiêu biểu</Link>
              </div>
            </div>
            <div className={`${styles.dropdown} ${styles.dropdownMenuWrapper}`} style={{ width: "130px" }}>
              <a className={`${styles.nav} ${styles.center} ${styles.dropdownToggle}`}>
                GIA SƯ
              </a>
              <div className={styles.dropdownMenu}>
                <Link to="/RegisterTutor" className={styles.dropdownItem}>Cập nhật hồ sơ khi đã đăng ký</Link>
                <Link to="/registerTutors" className={styles.dropdownItem}>Đăng ký làm gia sư</Link>
                <Link to="/BookTutorOnline" className={styles.dropdownItem}>Danh sách gia sư online</Link>
                <Link to="/BookTutorOffline" className={styles.dropdownItem}>Danh sách gia sư offline</Link>
              </div>
            </div>
            {/* <a href="/" className={`${styles.nav} ${styles.center}`}>
              LỚP MỚI
            </a> */}
            <Link to="/buycoin" className={`${styles.nav} ${styles.center}`}>
              MUA COIN
            </Link>
            <Link to="/NewsPage" className={`${styles.nav} ${styles.center}`}>
              TIN TỨC
            </Link>
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
              <NotifyBell />
            </Stack>
            <Button onClick={handleClickCoin} variant='text' sx={buttonStyles} style={{ textTransform: "none" }}>
              {user?.coinBalance || "0"} Coin
            </Button>
            <ProfileMenu />
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
