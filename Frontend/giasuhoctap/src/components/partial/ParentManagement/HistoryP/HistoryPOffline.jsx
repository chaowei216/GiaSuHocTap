import React, { useState } from 'react';
import styles from './HistoryP.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser, faCircleQuestion, faCoins, faStar } from '@fortawesome/free-solid-svg-icons';

const HistoryPOffline = () => {
    // Dữ liệu mẫu các card
    const cardsData = [
        {
            name: 'Trần Hồ Nam',
            status: 'ĐANG CHỜ',
            imgSrc: '../../../../../public/img/tutor.jpg',
            subject: 'Toán',
            grade: 'Lớp 9',
            teachingMethod: 'Offline',
            teachingDays: 'Thứ 2, buổi chiều, 8-12h',
            coins: 154
        },
        {
            name: 'Trần Hồ Nam',
            status: 'ĐANG CHỜ',
            imgSrc: '../../../../../public/img/tutor.jpg',
            subject: 'Hóa',
            grade: 'Lớp 9',
            teachingMethod: 'Offline',
            teachingDays: 'Thứ 2, buổi chiều, 8-12h',
            coins: 16
        },
        {
            name: 'Trần Hồ Nam',
            status: 'ĐANG CHỜ',
            imgSrc: '../../../../../public/img/tutor.jpg',
            subject: 'Anh',
            grade: 'Lớp 9',
            teachingMethod: 'Offline',
            teachingDays: 'Thứ 2, buổi chiều, 8-12h',
            coins: 17
        },
        {
            name: 'Trần Hồ Nam',
            status: 'ĐANG CHỜ',
            imgSrc: '../../../../../public/img/tutor.jpg',
            subject: 'Toán',
            grade: 'Lớp 9',
            teachingMethod: 'Offline',
            teachingDays: 'Thứ 2, buổi chiều, 8-12h',
            coins: 18
        }
    ];


    const [selectedCard, setSelectedCard] = useState(null);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false); // State cho modal báo cáo


    const handleReportClick = (card) => {
        setSelectedCard(card);
        setIsReportModalOpen(true);
    };

    const handleCloseReportModal = () => {
        setIsReportModalOpen(false);
        setSelectedCard(null);
    };


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
                            <div className={styles.historyFeedback}>
                                <div className={styles.feedbackButton}>
                                    <div className={styles.report}>
                                        <button onClick={() => handleReportClick(card)}>HỦY</button>
                                    </div>
                                    {/* <div className={styles.evaluate}>
                                        <button onClick={() => handleEvaluateClick(card)}>THÊM GIỜ</button>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {isReportModalOpen && selectedCard && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <span className={styles.close} onClick={handleCloseReportModal}>&times;</span>
                        <div className={styles.titleReport}>
                            <h1>Hủy Môn Học Đã Đặt</h1>
                        </div>
                        <div className={styles.historyContentEvaluate}>
                            <div className={styles.historyImgEvaluate}>
                                <img src={selectedCard.imgSrc} alt="Profile" />
                            </div>
                            <div className={styles.historyDetail}>
                                <div className={styles.detailItem}>
                                    <h1>{selectedCard.name}</h1>
                                </div>
                                <div className={styles.detailItem}>
                                    <p>Môn học:</p>
                                    <p style={{ color: '#0000FF' }}>{selectedCard.subject}</p>
                                </div>
                                <div className={styles.detailItem}>
                                    <p>Lớp học:</p>
                                    <p style={{ color: '#0000FF' }}>{selectedCard.grade}</p>
                                </div>
                                <div className={styles.detailItem}>
                                    <p>Ngày dạy:</p>
                                    <p>{selectedCard.teachingDays}</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.reportSelect}>
                            <select className={styles.selectReason} style={{width: '40%'}}>
                                <option value="">Lý do Hủy</option>
                                <option value="">Thay đổi giờ</option>
                                <option value="">Muốn chọn gia sư khác</option>
                                <option value="">Lý do khác</option>
                            </select>
                        </div>
                        <textarea className={styles.reportTextarea} placeholder="Chi tiết lý do..." />
                        <div className={styles.reviewButtonGroup}>
                            <button onClick={handleCloseReportModal}>Trở Lại</button>
                            <button onClick={handleCloseReportModal}>Xác Nhận Hủy</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HistoryPOffline;
