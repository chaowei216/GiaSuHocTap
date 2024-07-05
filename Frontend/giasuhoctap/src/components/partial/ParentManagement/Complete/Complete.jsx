import React, { useState } from 'react';
import styles from './Complete.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser, faCircleQuestion, faCoins, faStar, faTimes } from '@fortawesome/free-solid-svg-icons';

const Complete = () => {
    // Dữ liệu mẫu các card
    const cardsData = [
        {
            name: 'Trần Hồ Nam',
            status: 'HOÀN THÀNH',
            imgSrc: '../../../../../public/img/tutor.jpg',
            subject: 'Toán',
            grade: 'Lớp 9',
            teachingMethod: 'Online',
            teachingDays: 'Thứ 2, buổi chiều, 8-12h',
            coins: 15
        },
        {
            name: 'Trần Hồ Nam',
            status: 'HOÀN THÀNH',
            imgSrc: '../../../../../public/img/tutor.jpg',
            subject: 'Hóa',
            grade: 'Lớp 9',
            teachingMethod: 'Offline',
            teachingDays: 'Thứ 2, buổi chiều, 8-12h',
            coins: 15
        },
        {
            name: 'Trần Hồ Nam',
            status: 'HOÀN THÀNH',
            imgSrc: '../../../../../public/img/tutor.jpg',
            subject: 'Anh',
            grade: 'Lớp 9',
            teachingMethod: 'Online',
            teachingDays: 'Thứ 2, buổi chiều, 8-12h',
            coins: 15
        },
        {
            name: 'Trần Hồ Nam',
            status: 'HOÀN THÀNH',
            imgSrc: '../../../../../public/img/tutor.jpg',
            subject: 'Toán',
            grade: 'Lớp 9',
            teachingMethod: 'Online',
            teachingDays: 'Thứ 2, buổi chiều, 8-12h',
            coins: 15
        }
    ];

    const [rating, setRating] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [message, setMessage] = useState('');
    const [isReportModalOpen, setIsReportModalOpen] = useState(false); // State cho modal báo cáo

    const messages = ['Tệ', 'Không hài lòng', 'Bình thường', 'Hài lòng', 'Tuyệt vời'];

    const handleStarClick = (index) => {
        setRating(index + 1);
        setMessage(messages[index]);
    };

    const handleEvaluateClick = (card) => {
        setSelectedCard(card);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setRating(0);
        setSelectedCard(null);
        setMessage('');
    };

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
                                        <button onClick={() => handleReportClick(card)}>Báo Cáo</button>
                                    </div>
                                    <div className={styles.evaluate}>
                                        <button onClick={() => handleEvaluateClick(card)}>Đánh Giá</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {isModalOpen && selectedCard && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <span className={styles.close} onClick={handleCloseModal}>&times;</span>
                        <div className={styles.titleEvaluate}>
                            <h1>Đánh Giá Gia Sư</h1>
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
                        <div className={styles.starContainer}>
                            <div className={styles.starTitle}>
                                <h3>Bạn có hài lòng về gia sư</h3>
                            </div>
                            <div>
                                {[...Array(5)].map((star, index) => (
                                    <FontAwesomeIcon
                                        key={index}
                                        icon={faStar}
                                        className={`${styles.star} ${index < rating ? styles.checked : ''}`}
                                        onClick={() => handleStarClick(index)}
                                    />
                                ))}
                            </div>
                            <div className={styles.ratingMessage}>
                                {message}
                            </div>
                        </div>
                        <textarea className={styles.reviewTextarea} placeholder="Viết đánh giá của bạn tại đây..." />
                        <div className={styles.reviewButtonGroup}>
                            <button onClick={handleCloseModal}>Trở Lại</button>
                            <button onClick={handleCloseModal}>Hoàn Thành</button>
                        </div>
                    </div>
                </div>
            )}

{isReportModalOpen && selectedCard && (
    <div className={styles.modal}>
        <div className={styles.modalContent}>
            <span className={styles.close} onClick={handleCloseReportModal}>&times;</span>
            <div className={styles.titleReport}>
                <h1>Báo Cáo Gia Sư</h1>
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
                <select className={styles.selectReason}>
                    <option value="">Chọn lý do báo cáo</option>
                    <option value="Nội dung không đúng yêu cầu">Nội dung không đúng yêu cầu</option>
                    <option value="Gia sư không đúng giờ">Gia sư không đúng giờ</option>
                    <option value="Thái độ không phù hợp của gia sư/học sinh">Thái độ không phù hợp của gia sư/học sinh</option>
                    <option value="Phản hồi không thỏa đáng">Phản hồi không thỏa đáng</option>
                </select>
            </div>
            <textarea className={styles.reportTextarea} placeholder="Chi tiết về báo cáo..." />
            <div className={styles.reviewButtonGroup}>
                <button onClick={handleCloseReportModal}>Trở Lại</button>
                <button onClick={handleCloseReportModal}>Gửi Báo Cáo</button>
            </div>
        </div>
    </div>
)}
        </div>
    );
};

export default Complete;
