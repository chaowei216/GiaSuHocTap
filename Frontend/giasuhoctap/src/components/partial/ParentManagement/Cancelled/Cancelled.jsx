import React, { useState } from 'react';
import styles from './Cancelled.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser, faCircleQuestion, faCoins, faStar, faTimes } from '@fortawesome/free-solid-svg-icons';

const Cancelled = () => {
    // Dữ liệu mẫu các card
    const cardsData = [
        {
            name: 'Trần Hồ Nam',
            status: 'ĐÃ HỦY',
            imgSrc: '../../../../../public/img/tutor.jpg',
            subject: 'Toán',
            grade: 'Lớp 9',
            teachingMethod: 'Online',
            teachingDays: 'Thứ 2, buổi chiều, 8-12h',
            coins: 15
        },
        {
            name: 'Trần Hồ Nam',
            status: 'ĐÃ HỦY',
            imgSrc: '../../../../../public/img/tutor.jpg',
            subject: 'Hóa',
            grade: 'Lớp 9',
            teachingMethod: 'Online',
            teachingDays: 'Thứ 2, buổi chiều, 8-12h',
            coins: 15
        },
        {
            name: 'Trần Hồ Nam',
            status: 'ĐÃ HỦY',
            imgSrc: '../../../../../public/img/tutor.jpg',
            subject: 'Anh',
            grade: 'Lớp 9',
            teachingMethod: 'Online',
            teachingDays: 'Thứ 2, buổi chiều, 8-12h',
            coins: 15
        },
        {
            name: 'Trần Hồ Nam',
            status: 'ĐÃ HỦY',
            imgSrc: '../../../../../public/img/tutor.jpg',
            subject: 'Toán',
            grade: 'Lớp 9',
            teachingMethod: 'Online',
            teachingDays: 'Thứ 2, buổi chiều, 8-12h',
            coins: 15
        }
    ];

    
    return (
        <div>
            {cardsData.map((card, index) => (
                <div key={index}>
                    <div className={styles.Body}>
                        <div className='container'>
                            <div className={styles.historyTitle}>
                                <div className={styles.nameTitle}>
                                    <h2>Gia Sư {card.teachingMethod}</h2>
                                </div>
                                <div className={styles.statusTitle}>
                                    <div className={styles.statusIcon}>
                                        <FontAwesomeIcon icon={faChalkboardUser} className={styles.icon} />
                                        <p>Trạng thái dạy</p>
                                        <FontAwesomeIcon icon={faCircleQuestion} className={styles.icon} />
                                    </div>
                                    <div className={styles.statusName}>
                                        <p>{card.status}</p>
                                    </div>
                                </div>
                            </div>
                            <hr style={{ width: '97%', marginLeft: '20px' }} />
                            <div className={styles.historyContent}>
                                <div className={styles.historyImg}>
                                    <img src={card.imgSrc} alt="Profile" />
                                </div>
                                <div className={styles.historyDetail}>
                                    <div className={styles.detailItem}>
                                        <h1>{card.name}</h1>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p>Môn học:</p>
                                        <p style={{ color: '#0000FF' }}>{card.subject}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p>Lớp học:</p>
                                        <p style={{ color: '#0000FF' }}>{card.grade}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p>Ngày dạy:</p>
                                        <p>{card.teachingDays}</p>
                                    </div>
                                </div>
                            </div>
                            <hr style={{ width: '97%', marginLeft: '20px', marginTop: '15px' }} />
                            <div className={styles.historyCoin}>
                                <div className={styles.coinIcon}>
                                    <FontAwesomeIcon icon={faCoins} className={styles.icon} />
                                    <p>Thành coin:</p>
                                    <h1>{card.coins}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Cancelled;
