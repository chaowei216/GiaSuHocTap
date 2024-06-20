import React from 'react';
import styles from './Navbar.module.css';
import logo from '../../../../../public/img/logoGiasu2.png';

const Navbar = () => {
  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navbarInner}>
        <div className={styles.navLeft}>
          <img src={logo} alt="logo" className={styles.brand} />
        </div>
        <div className={styles.navRight}>
          <div className={styles.navLinksWrapper}>
            <div className={styles.teal}>
              <a href="/" className={`${styles.nav} ${styles.center} ${styles.dropdownToggle}`}>
                TRANG CHỦ
              </a>
              <div className={`${styles.dropdown} ${styles.dropdownWrapper}`}>
                <a href="/" className={`${styles.nav} ${styles.center} ${styles.dropdownToggle}`}>
                  PHỤ HUYNH
                </a>
                <div className={styles.dropdownMenu}>
                  <a href="/" className={styles.dropdownItem}>Đăng ký tìm gia sư</a>
                  <a href="/" className={styles.dropdownItem}>Dịch vụ gia sư</a>
                  <a href="/" className={styles.dropdownItem}>Gia sư tiêu biểu</a>
                </div>
              </div>
              <div className={`${styles.dropdown} ${styles.dropdownMenuWrapper}`}>
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
              <a href="/" className={`${styles.nav} ${styles.center}`}>
                LIÊN HỆ
              </a>
            </div>
          </div>
          <div>
            <button href="/login" className={styles.login}>Log in</button>
            <button className={styles.signup}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
