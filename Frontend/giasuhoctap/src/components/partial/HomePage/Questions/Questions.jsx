import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faGift, faBoxOpen, faRotate } from '@fortawesome/free-solid-svg-icons';
import styles from './Questions.module.css';
import { GetStatisticGeneral } from '../../../../api/StatisticGeneralApi';

const Questions = () => {
  const [statisticData, setStatisticData] = useState({
    totalTutor: 0,
    totalStudent: 0,
    successfulLessons: 0,
    satisfiedParents: 0
  });

  useEffect(() => {
    const fetchStatisticData = async () => {
      try {
        const response = await GetStatisticGeneral(); // Gọi hàm API để lấy dữ liệu

        if (response.statusCode === 200) {
          const data = response.data;
          setStatisticData({
            totalTutor: data.totalTutor,
            totalStudent: data.totalStudent,
            successfulLessons: data.successfulLesson,
            satisfiedParents: data.feedbackSatisfied
          });
        } else {
          console.error('Failed to fetch data:', response.message);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchStatisticData(); // Gọi hàm lấy dữ liệu khi component được mount
  }, []); // Tham số thứ hai là một mảng rỗng để useEffect chỉ chạy một lần khi component mount

  // Render các thành phần UI với dữ liệu từ state
  return (
    <div className={styles.questionsWrapper}>
      <div style={{ display: 'flex' }}>
        <div className={styles.counter}>
          <FontAwesomeIcon icon={faClock} className={styles.icon} />
          <p>Gia Sư Toàn Quốc</p>
          <p style={{ color: '#23B527', fontWeight: '500', fontSize: '30px' }}>{statisticData.totalTutor}</p>
        </div>
        <div className={styles.counter}>
          <FontAwesomeIcon icon={faGift} className={styles.icon} />
          <p>Học Viên</p>
          <p style={{ color: '#23B527', fontWeight: '500', fontSize: '30px'  }}>{statisticData.totalStudent}</p>
        </div>
        <div className={styles.counter}>
          <FontAwesomeIcon icon={faBoxOpen} className={styles.icon} />
          <p>Buổi Học Thành Công</p>
          <p style={{ color: '#23B527', fontWeight: '500', fontSize: '30px' }}>{statisticData.successfulLessons}</p>
        </div>
        <div className={styles.counter}>
          <FontAwesomeIcon icon={faRotate} className={styles.icon} />
          <p>Phụ Huynh Rất Hài Lòng</p>
          <p style={{ color: '#23B527', fontWeight: '500', fontSize: '30px' }}>{statisticData.satisfiedParents}</p>
        </div>
      </div>
    </div>
  );
};

export default Questions;
