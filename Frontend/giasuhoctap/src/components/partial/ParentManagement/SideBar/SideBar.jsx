import React, { useState } from 'react';
import styles from './SideBar.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faIdCard } from '@fortawesome/free-solid-svg-icons';

const SideBar = () => {
  const [showAccount, setShowAccount] = useState(false);
  const [showWallet, setShowWallet] = useState(false);

  const toggleAccountDropdown = () => setShowAccount(!showAccount);
  const toggleWalletDropdown = () => setShowWallet(!showWallet);

  return (
    <div className={styles.sidebar}>
      <nav className={styles.nav}>
        <div className={styles.nav_list}>
          <div className={styles.nav_item}>
            <div className={styles.nav_link} onClick={toggleAccountDropdown}>
              <FontAwesomeIcon icon={faIdCard} className={styles.icon} />
              <span className={styles.nav_name}>TÀI KHOẢN</span>
            </div>
            {showAccount && (
              <div className={styles.dropdown_menu}>
                <a className={styles.dropdown_item} href="/ParentPage">Thông tin cá nhân</a>
                <a className={styles.dropdown_item} href="#/action-2">Theo dõi Parent</a>
                <a className={styles.dropdown_item} href="/ParentHistory">Lịch sử giao dịch</a>
                <a className={styles.dropdown_item} href="#/action-3">Thanh toán</a>
                <a className={styles.dropdown_item} href="#/action-3">Ví</a>
              </div>
            )}
          </div>
          <hr style={{width: '95%', color: '#000000b5'}}/>
          <div className={styles.nav_item}>
            <div className={styles.nav_link} onClick={toggleWalletDropdown}>
              <FontAwesomeIcon icon={faMoneyBillWave} className={styles.icon} />
              <span className={styles.nav_name}>VÍ ĐIỆN TỬ</span>
            </div>
            {showWallet && (
              <div className={styles.dropdown_menu}>
                <a className={styles.dropdown_item} href="#/action-1">Option 1</a>
                <a className={styles.dropdown_item} href="#/action-2">Option 2</a>
                <a className={styles.dropdown_item} href="#/action-3">Option 3</a>
              </div>
            )}
          </div>
          <hr style={{width: '90%', color: '#000000b5'}}/>
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
