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
    if (path.includes('ParentRequestOffline')) {
      setActiveTab('request');
    } else if (path.includes('ParentCompleteOffline')) {
      setActiveTab('completed');
    } else if (path.includes('ParentCancelledOffline')) {
      setActiveTab('cancelled');
    } else if (path.includes('ParentHistoryOffline')) {
      setActiveTab('all');
    } else {
      setActiveTab('all'); // Nếu không phù hợp với bất kỳ đường dẫn nào khác, mặc định là 'all'
    }
  }, [location]);

  return (
    <ul className={styles.nav}>
      <li className={styles.navItem}>
        <a
          className={`${styles.navLink} ${activeTab === 'all' ? styles.active : ''}`}
          href="#"
          onClick={() => handleTabClick('all', '/ParentHistoryOffline')}
        >
          ĐANG CHỜ
        </a>
      </li>
      <li className={styles.navItem}>
        <a
          className={`${styles.navLink} ${activeTab === 'request' ? styles.active : ''}`}
          href="#"
          onClick={() => handleTabClick('request', '/ParentRequestOffline')}
        >
          ĐANG HỌC
        </a>
      </li>
      <li className={styles.navItem}>
        <a
          className={`${styles.navLink} ${activeTab === 'completed' ? styles.active : ''}`}
          href="#"
          onClick={() => handleTabClick('completed', '/ParentCompleteOffline')}
        >
          HOÀN THÀNH
        </a>
      </li>
      <li className={styles.navItem}>
        <a
          className={`${styles.navLink} ${activeTab === 'cancelled' ? styles.active : ''}`}
          href="#"
          onClick={() => handleTabClick('cancelled', '/ParentCancelledOffline')}
        >
          ĐÃ HỦY
        </a>
      </li>
    </ul>
  );
};

export default NavbarHistoryP;
