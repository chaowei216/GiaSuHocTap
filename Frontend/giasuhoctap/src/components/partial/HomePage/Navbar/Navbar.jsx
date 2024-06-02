import React from "react";
import styles from "./Navbar.module.css";

const Navbar = ({ hamActive, setHamActive }) => {
  const logo =
    "https://d2guulkeunn7d8.cloudfront.net/assets/beetstrap/brand/instacart-logo-color-4db9d81ca0b7638befdc4bd331f64a2633df790c0b55ef627c99b1ba77af72b7.svg";
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
            <a href="/" className={`${styles.nav} center`}>
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
