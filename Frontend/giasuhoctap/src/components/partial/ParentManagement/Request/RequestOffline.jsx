import React, { useState } from 'react';
import styles from './Request.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser, faCircleQuestion, faCoins, faStar } from '@fortawesome/free-solid-svg-icons';

const RequestOffline = () => {
    // Dữ liệu mẫu các card
    const cardsData = [
        {
            name: 'Trần Hồ Nam',
            status: 'ĐANG HỌC',
            imgSrc: '../../../../../public/img/tutor.jpg',
            subject: 'Toán',
            grade: 'Lớp 9',
            teachingMethod: 'Offline',
            teachingDays: 'Thứ 2, buổi chiều, 8-12h',
            coins: 156
        },
        {
            name: 'Trần Hồ Nam',
            status: 'ĐANG HỌC',
            imgSrc: '../../../../../public/img/tutor.jpg',
            subject: 'Hóa',
            grade: 'Lớp 9',
            teachingMethod: 'Offline',
            teachingDays: 'Thứ 2, buổi chiều, 8-12h',
            coins: 16
        },
        {
            name: 'Trần Hồ Nam',
            status: 'ĐANG HỌC',
            imgSrc: '../../../../../public/img/tutor.jpg',
            subject: 'Anh',
            grade: 'Lớp 9',
            teachingMethod: 'Offline',
            teachingDays: 'Thứ 2, buổi chiều, 8-12h',
            coins: 17
        },
        {
            name: 'Trần Hồ Nam',
            status: 'ĐANG HỌC',
            imgSrc: '../../../../../public/img/tutor.jpg',
            subject: 'Toán',
            grade: 'Lớp 9',
            teachingMethod: 'Offline',
            teachingDays: 'Thứ 2, buổi chiều, 8-12h',
            coins: 18
        }
    ];


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [additionalHours, setAdditionalHours] = useState(0); // State để lưu số giờ thêm vào
    const [selectedCoins, setSelectedCoins] = useState(0); // State để lưu số coin hiện tại của selectedCard



    const handleEvaluateClick = (card) => {
        setSelectedCard(card);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCard(null);
        setAdditionalHours(0); // Reset số giờ thêm vào khi đóng modal
        setSelectedCoins(0); // Reset số coin hiện tại khi đóng modal
    };




    const handleAdditionalHoursChange = (event) => {
        const hours = parseInt(event.target.value, 10);
        setAdditionalHours(hours);
        const selectedCoins = selectedCard.coins * (hours); // Tính số coin mới khi thêm giờ
        setSelectedCoins(selectedCoins);
    };

    const handleAddHours = () => {
        // Logic tính số coin khi thêm giờ vào đây
        const selectedCardCopy = { ...selectedCard };
        const newCoins = selectedCardCopy.coins * (additionalHours); // Tính số coin mới sau khi thêm giờ
        selectedCardCopy.coins = newCoins;

        // Cập nhật lại selectedCard và đóng modal
        setSelectedCard(selectedCardCopy);
        setIsModalOpen(false);
        setAdditionalHours(0); // Reset số giờ thêm vào
        setSelectedCoins(0); // Reset số coin hiện tại
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
                                    <div className={styles.evaluate}>
                                        <button onClick={() => handleEvaluateClick(card)}>THÊM GIỜ</button>
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
                        <div className={styles.historyContentEvaluate} style={{marginLeft: '50px'}}>
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
                        <div className={styles.extendBox}>
                            <select className={styles.extendSelect} onChange={handleAdditionalHoursChange} value={additionalHours}>
                                <option >Chọn Số Giờ Thêm</option>
                                <option value="1">1 giờ</option>
                                {/* <option value="2">2 giờ</option>
                                <option value="3">3 giờ</option>
                                <option value="4">4 giờ</option> */}
                            </select>
                            <div className={styles.additionalCoins}>
                                <FontAwesomeIcon icon={faCoins} className={styles.icon} />
                                <p> Số coin cần trả: </p>
                                <div style={{ fontSize: '25px', marginLeft: '10px', color: '#4dccda' }}>
                                    {additionalHours > 0 ? <p>{selectedCoins}</p> : <p>0</p>}
                                </div>
                            </div>
                        </div>
                        <div className={styles.reviewButtonGroupExtend}>
                            <button className={styles.closeHoursButton} onClick={handleCloseModal}>Hủy</button>
                            <button className={styles.addHoursButton} onClick={handleAddHours}>Thêm Giờ</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RequestOffline;
