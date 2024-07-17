import React from 'react';
import styles from './SideBar.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

const SideBar = () => {
  const location = useLocation();

  const getNavLinkClass = (path) => {
    return location.pathname === path ? `${styles.dropdown_item} ${styles.active}` : styles.dropdown_item;
  };

  return (
    <div className={styles.sidebar}>
      <nav className={styles.nav}>
        <div className={styles.nav_list}>
          <div className={styles.nav_item}>
            <div className={styles.nav_link}>
              <FontAwesomeIcon icon={faIdCard} className={styles.icon} />
              <span className={styles.nav_name}>TÀI KHOẢN</span>
            </div>
            <div className={styles.dropdown_menu}>
              <Link className={getNavLinkClass('/ParentPage')} to="/ParentPage">Thông tin cá nhân</Link>
              <Link className={getNavLinkClass('/ParentHistory')} to="/ParentHistory">Lịch sử đăng ký gia sư Online</Link>
              <Link className={getNavLinkClass('/ParentHistoryOffline')} to="/ParentHistoryOffline">Lịch sử đăng ký gia sư Offline</Link>
              <Link className={getNavLinkClass('/ParentHistoryTransaction')} to="/ParentHistoryTransaction">Lịch sử giao dịch</Link>
            </div>
          </div>
          <hr style={{ width: '95%', color: '#000000b5' }} />
          <hr style={{ width: '90%', color: '#000000b5' }} />
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
