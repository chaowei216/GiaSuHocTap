import React from 'react';
import CountUp from 'react-countup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faGift, faBoxOpen, faRotate } from '@fortawesome/free-solid-svg-icons';
import styles from './Questions.module.css';

const Questions = () => {
  return (
    <div className={styles.questionsWrapper}>
      <div style={{ display: 'flex' }}>
        <div className={styles.counter}>
          <FontAwesomeIcon icon={faClock} className={styles.icon} />
          <p>Gia Sư Toàn Quốc</p>
          <CountUp style={{color:'#23B527', fontWeight: '500'}} end={40000} duration={3} />
        </div>
        <div className={styles.counter}>
          <FontAwesomeIcon icon={faGift} className={styles.icon} />
          <p>Học Viên</p>
          <CountUp style={{color:'#23B527', fontWeight: '500'}} end={3050} duration={3} />
        </div>
        <div className={styles.counter}>
          <FontAwesomeIcon icon={faBoxOpen} className={styles.icon} />
          <p>Buổi Học Thành Công</p>
          <CountUp style={{color:'#23B527', fontWeight: '500'}} end={50000} duration={3} />
        </div>
        <div className={styles.counter}>
          <FontAwesomeIcon icon={faRotate} className={styles.icon} />
          <p>Phụ Huynh Rất Hài Lòng</p>
          <CountUp style={{color:'#23B527', fontWeight: '500'}} end={100000} duration={3} />
        </div>
      </div>
    </div>
  );
};

export default Questions;
