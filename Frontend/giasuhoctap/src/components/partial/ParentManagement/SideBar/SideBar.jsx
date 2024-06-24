import React, { useState } from 'react';
import styles from './SideBar.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';

const SideBar = () => {
  const [showNav, setShowNav] = useState(false);

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  return (
    <div className={`${styles.body} ${showNav ? styles.body_pd : ''}`}>
      <header className={`${styles.header} ${showNav ? styles.body_pd : ''}`} id="header">
        <div className={styles.header_toggle} onClick={toggleNav}>
          <i className={`bx ${showNav ? 'bx-x' : 'bx-menu'}`} id="header-toggle"></i>
        </div>
        <div className={styles.header_img}>
          <img src="https://i.imgur.com/hczKIze.jpg" alt="Profile" />
        </div>
      </header>
      <div className={`${styles.l_navbar} ${showNav ? styles.show : ''}`} id="nav-bar">
        <nav className={styles.nav}>
          <div>
            <a href="#" className={`${styles.nav_logo} nav_logo`}>
              <i className='bx bx-layer nav_logo-icon'></i>
              <span className={styles.nav_logo_name}>BBBootstrap</span>
            </a>
            <div className={styles.nav_list}>
              <a href="#" className={`${styles.nav_link} ${styles.active}`}>
                <i className='bx bx-grid-alt nav_icon'></i>
                <span className={styles.nav_name}>Dashboard</span>
              </a>
              <a href="#" className={styles.nav_link}>
                <i className='bx bx-user nav_icon'></i>
                <span className={styles.nav_name}>Users</span>
              </a>
              <a href="#" className={styles.nav_link}>
                <i className='bx bx-message-square-detail nav_icon'></i>
                <span className={styles.nav_name}>Messages</span>
              </a>
              <a href="#" className={styles.nav_link}>
                <i className='bx bx-bookmark nav_icon'></i>
                <span className={styles.nav_name}>Bookmark</span>
              </a>
              <a href="#" className={styles.nav_link}>
                <i className='bx bx-folder nav_icon'></i>
                <span className={styles.nav_name}>Files</span>
              </a>
              <a href="#" className={styles.nav_link}>
                <i className='bx bx-bar-chart-alt-2 nav_icon'></i>
                <span className={styles.nav_name}>Stats</span>
              </a>
            </div>
          </div>
          <a href="#" className={styles.nav_link}>
            <i className='bx bx-log-out nav_icon'></i>
            <span className={styles.nav_name}>SignOut</span>
          </a>
        </nav>
      </div>
      <div className="height-100 bg-light">
        <h4>Main Components</h4>
      </div>
    </div>
  );
};

export default SideBar;
