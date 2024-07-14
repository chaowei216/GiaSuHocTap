import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './NavbarHistoryP.module.css';

const NavbarHistoryP = () => {
  const [activeTab, setActiveTab] = useState('all'); // tab mặc định là 'all'
  const navigate = useNavigate(); // Khai báo useNavigate
  const location = useLocation(); // Khai báo useLocation

  const handleTabClick = (tabName, path) => {
    setActiveTab(tabName);
    navigate(path); // Điều hướng đến path được truyền vào
  };

  // Cập nhật activeTab dựa trên đường dẫn hiện tại
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('ParentRequest')) {
      setActiveTab('request');
    } else if (path.includes('ParentComplete')) {
      setActiveTab('completed');
    } else if (path.includes('ParentCancelled')) {
      setActiveTab('cancelled');
    } else if (path.includes('ParentHistory')) {
      setActiveTab('all');
    } else {
      setActiveTab('all');
    }
  }, [location]);

  return (
    <ul className={styles.nav}>
      <li className={styles.navItem}>
        <a
          className={`${styles.navLink} ${activeTab === 'all' ? styles.active : ''}`}
          href="#"
          onClick={() => handleTabClick('all', '/ParentHistory')}
        >
          ĐANG CHỜ
        </a>
      </li>
      <li className={styles.navItem}>
        <a
          className={`${styles.navLink} ${activeTab === 'request' ? styles.active : ''}`}
          href="#"
          onClick={() => handleTabClick('request', '/ParentRequest')}
        >
          ĐANG HỌC
        </a>
      </li>
      <li className={styles.navItem}>
        <a
          className={`${styles.navLink} ${activeTab === 'completed' ? styles.active : ''}`}
          href="#"
          onClick={() => handleTabClick('complete', '/ParentComplete')}
        >
          HOÀN THÀNH
        </a>
      </li>
      <li className={styles.navItem}>
        <a
          className={`${styles.navLink} ${activeTab === 'cancelled' ? styles.active : ''}`}
          href="#"
          onClick={() => handleTabClick('cancelled', '/ParentCancelled')}
        >
          ĐÃ HỦY
        </a>
      </li>
    </ul>
  );
};

export default NavbarHistoryP;
