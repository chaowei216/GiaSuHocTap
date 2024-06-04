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
              Departments
            </a>
            <a href="/" className={`${styles.nav} center`}>
              More ways to shop
            </a>
            <a href="/register" className={`${styles.nav} center`}>
              Help
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