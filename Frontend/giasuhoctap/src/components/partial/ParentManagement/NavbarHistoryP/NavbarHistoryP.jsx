import React, { useState } from 'react';
import styles from './NavbarHistoryP.module.css';

const NavbarHistoryP = () => {
  const [activeTab, setActiveTab] = useState('all'); // tab mặc định là 'all'

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <ul className={styles.nav}>
      <li className={styles.navItem}>
        <a
          className={`${styles.navLink} ${activeTab === 'all' ? styles.active : ''}`}
          href="#"
          onClick={() => handleTabClick('all')}
        >
          TẤT CẢ
        </a>
      </li>
      <li className={styles.navItem}>
        <a
          className={`${styles.navLink} ${activeTab === 'pending' ? styles.active : ''}`}
          href="#"
          onClick={() => handleTabClick('pending')}
        >
          CHỜ THANH TOÁN
        </a>
      </li>
      <li className={styles.navItem}>
        <a
          className={`${styles.navLink} ${activeTab === 'completed' ? styles.active : ''}`}
          href="#"
          onClick={() => handleTabClick('completed')}
        >
          HOÀN THÀNH
        </a>
      </li>
      <li className={styles.navItem}>
        <a
          className={`${styles.navLink} ${activeTab === 'cancelled' ? styles.active : ''}`}
          href="#"
          onClick={() => handleTabClick('cancelled')}
        >
          ĐÃ HỦY
        </a>
      </li>
      <li className={styles.navItem}>
        <a
          className={`${styles.navLink} ${activeTab === 'refunded' ? styles.active : ''}`}
          href="#"
          onClick={() => handleTabClick('refunded')}
        >
          HOÀN TIỀN
        </a>
      </li>
    </ul>
  );
};

export default NavbarHistoryP;
