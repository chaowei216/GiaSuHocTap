import React from "react";
import styles from "./Navbar.module.css";
import logo from "../../../../../public/img/Logo2.jpg";

const Navbar = ({ hamActive, setHamActive }) => {
  const handleClick = () => {
    setHamActive(!hamActive);
  };

  return (
    <div className={`${styles.navbarWrapper}`}>
      <div className={`${styles.navbarInner}`}>
        <div className={`${styles.navLeft}`}>
          <img src={logo} alt="logo" className={styles.brand} />
        </div>
        <div className={`${styles.navRight}`}>
          <div className={styles.navLinksWrapper}>
            <div className={styles.verticalLine}> </div>
            <a href="/" className={`${styles.nav} center`}>
              TRANG CHỦ
            </a>
            <a href="/" className={`${styles.nav} center`}>
              PHỤ HUYNH
            </a>
            <a href="/" className={`${styles.nav} center`}>
              GIA SƯ
            </a>
            <a href="/" className={`${styles.nav} center`}>
              LỚP MỚI
            </a>
            <a href="/" className={`${styles.nav} center`}>
              TUYỂN DỤNG
            </a>
            <a href="/" className={`${styles.nav} center`}>
              LIÊN HỆ
            </a>
          </div>
          <div>
            <a href="/login" className={styles.login}>
              Log in
            </a>
            <button className={styles.signup}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;