// src/Footer.js
import React from 'react';
import styles from './Footer.module.css';
import logo from "../../../../../public/img/logoGiasu2.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faInstagram, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>Về Chúng Tôi</h3>
          <div className={styles.social}>
            <img src={logo} alt="logo" className={styles.brand} />
            <div className={styles.socialIcon}>
              <div className={styles.socialText}>
                <FontAwesomeIcon icon={faSquareFacebook} />
                <a href="">FaceBook</a>
              </div>
              <div  className={styles.socialText}>
                <FontAwesomeIcon icon={faInstagram} />
                <a href="">Instagram</a>
              </div>
              <div  className={styles.socialText}>
                <FontAwesomeIcon icon={faTwitterSquare} />
                <a href="">Twitter</a>
              </div>
            </div>
          </div>

        </div>
        <div className={styles.footerSection}>
          <h3>Liên Kết Nhanh</h3>
          <ul>
            <li><a href="/">Trang Chủ</a></li>
            <li><a href="/services">Dịch Vụ</a></li>
            <li><a href="/contact">Liên Hệ</a></li>
            <li><a href="/about">Về Chúng Tôi</a></li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h3>Liên Hệ</h3>
          <p>Địa chỉ: 123 Đường ABC, TP HCM</p>
          <p>Điện thoại: 0123 456 789</p>
          <p>Email: contact@giasuhoctap.com</p>
        </div>
      </div>
      <div className={styles.footerBottom}>
        &copy; {new Date().getFullYear()} Gia Sư Học Tâp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
