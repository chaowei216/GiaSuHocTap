import React, { useState, useEffect } from 'react';
import styles from './Complete.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser, faCircleQuestion, faCoins, faStar, faTimes } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../../../hooks/useAuth';
import PageNavigation from '../../TutorManagement/PageNavigation';
import PageSize from '../../TutorManagement/PageSize';
import { GetParentRequest } from '../../../../api/ParentHistory';
import { toast } from 'react-toastify';
import InventoryIcon from "@mui/icons-material/Inventory";

const Complete = () => {
    const { user } = useAuth()
    const [totalPages, setTotalPages] = useState();
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(5);
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        reason: '', // Lý do báo cáo
        details: '', // Chi tiết về báo cáo
    });
    const [rating, setRating] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [message, setMessage] = useState('');
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [feedbackMsg, setFeedbackMsg] = useState('');
    useEffect(() => {
        const getAllNotification = async () => {
            const response = await GetParentRequest("Online", "Hoàn thành", page, pageSize);
            if (response.ok) {
                const responseJson = await response.json();
                const data = responseJson.data.data;
                setData(data);
                setTotalPages(responseJson.data.totalPages)
            } else {
                toast.error("Lỗi sever")
            }
        }
        getAllNotification();
    }, [page, totalPages, pageSize])

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
    const handleSubmitReport = async (value) => {
        console.log(formData);
        setIsReportModalOpen(false);
        setSelectedCard(null);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmitFeedback = async (value) => {
        console.log(feedbackMsg);
        console.log(rating);
        setIsReportModalOpen(false);
        setSelectedCard(null);
    };
    return (
        <>
            <div>
                {data && data.map((card, index) => (
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
                                            <p>{card.requestStatus}</p>
                                        </div>
                                    </div>
                                </div>
                                <hr style={{ width: '97%', marginLeft: '20px' }} />
                                <div className={styles.historyContent}>
                                    <div className={styles.historyImg}>
                                        <img src="/img/tutor.jpg" alt="Profile" />
                                    </div>
                                    <div className={styles.historyDetail}>
                                        <div className={styles.detailItem}>
                                            {card.requestTimes?.map((item, index) => (
                                                <h1 key={index}>Gia sư: {item.timeTable.fullname}</h1>
                                            ))}
                                        </div>
                                        <div className={styles.detailItem}>
                                            <p>Môn học:</p>
                                            <p style={{ color: '#0000FF' }}>{card.courseName}</p>
                                        </div>
                                        <div className={styles.detailItem}>
                                            <p>Lớp học:</p>
                                            <p style={{ color: '#0000FF' }}>{card.className}</p>
                                        </div>
                                        <div className={styles.detailItem}>
                                            <p>Ngày yêu cầu:</p>
                                            <p>{card.createdDate.split("T")[0]}</p>
                                        </div>
                                        <div className={styles.detailItem}>
                                            <p>Giờ học:</p>
                                            {card.requestTimes?.map((item, index) => (
                                                <p key={index}>{item.timeTable.startTime} - {item.timeTable.endTime}</p>
                                            ))}
                                        </div>
                                        <div className={styles.detailItem}>
                                            <p>Buổi:</p>
                                            {card.requestTimes?.map((item, index) => (
                                                <p key={index}>{item.timeTable.period}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <hr style={{ width: '97%', marginLeft: '20px', marginTop: '15px' }} />
                                <div className={styles.historyCoin}>
                                    <div className={styles.coinIcon}>
                                        <FontAwesomeIcon icon={faCoins} className={styles.icon} />
                                        <p>Giá tiền:</p>
                                        <h1>{card.coin} xu</h1>
                                    </div>
                                </div>
                                <div className={styles.historyFeedback}>
                                    <div className={styles.feedbackButton}>
                                        <div onClick={() => handleReportClick(card)} className={styles.report}>
                                            <button>Báo Cáo</button>
                                        </div>
                                        <div onClick={() => handleEvaluateClick(card)} className={styles.evaluate}>
                                            <button>Đánh Giá</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {data && data.length === 0 &&
                    <div className='flex justify-center items-center' style={{ marginTop: "20px", width: "90%", height: "100px", background: "white" }}>
                        <InventoryIcon />
                        Không có dữ liệu
                    </div>
                }

                {isModalOpen && selectedCard && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <span className={styles.close} onClick={handleCloseModal}>&times;</span>
                            <div className={styles.titleEvaluate}>
                                <h1>Đánh Giá Gia Sư</h1>
                            </div>
                            <div className={styles.historyContentEvaluate}>
                                <div className={styles.historyImgEvaluate}>
                                    <img src="/img/tutor.jpg" alt="Profile" />
                                </div>
                                <div className={styles.historyDetail}>
                                    <div className={styles.detailItem}>
                                        {selectedCard.requestTimes?.map((item, index) => (
                                            <h1 key={index}>Gia sư: {item.timeTable.fullname}</h1>
                                        ))}
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p>Môn học:</p>
                                        <p style={{ color: '#0000FF' }}>{selectedCard.courseName}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p>Lớp học:</p>
                                        <p style={{ color: '#0000FF' }}>{selectedCard.className}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p>Giờ học:</p>
                                        {selectedCard.requestTimes?.map((item, index) => (
                                            <p key={index}>{item.timeTable.startTime} - {item.timeTable.endTime}</p>
                                        ))}
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p>Buổi:</p>
                                        {selectedCard.requestTimes?.map((item, index) => (
                                            <p key={index}>{item.timeTable.period}</p>
                                        ))}
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
                            <textarea value={feedbackMsg} onChange={(event) => setFeedbackMsg(event.target.value)} className={styles.reviewTextarea} placeholder="Viết đánh giá của bạn tại đây..." />
                            <div className={styles.reviewButtonGroup}>
                                <button onClick={handleCloseModal}>Trở Lại</button>
                                <button onClick={() => handleSubmitFeedback(selectedCard)}>Hoàn Thành</button>
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
                                    <img src="/img/tutor.jpg" alt="Profile" />
                                </div>
                                <div className={styles.historyDetail}>
                                    <div className={styles.detailItem}>
                                        {selectedCard.requestTimes?.map((item, index) => (
                                            <h1 key={index}>Gia sư: {item.timeTable.fullname}</h1>
                                        ))}
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p>Môn học:</p>
                                        <p style={{ color: '#0000FF' }}>{selectedCard.courseName}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p>Lớp học:</p>
                                        <p style={{ color: '#0000FF' }}>{selectedCard.className}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p>Giờ học:</p>
                                        {selectedCard.requestTimes?.map((item, index) => (
                                            <p key={index}>{item.timeTable.startTime} - {item.timeTable.endTime}</p>
                                        ))}
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p>Buổi:</p>
                                        {selectedCard.requestTimes?.map((item, index) => (
                                            <p key={index}>{item.timeTable.period}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.reportSelect}>
                                <select
                                    className={styles.selectReason}
                                    value={formData.reason}
                                    onChange={handleChange}
                                    name="reason"
                                >
                                    <option value="">Chọn lý do báo cáo</option>
                                    <option value="Nội dung không đúng yêu cầu">Nội dung không đúng yêu cầu</option>
                                    <option value="Gia sư không đúng giờ">Gia sư không đúng giờ</option>
                                    <option value="Thái độ không phù hợp của gia sư/học sinh">
                                        Thái độ không phù hợp của gia sư/học sinh
                                    </option>
                                    <option value="Phản hồi không thỏa đáng">Phản hồi không thỏa đáng</option>
                                </select>
                            </div>
                            <textarea
                                className={styles.reportTextarea}
                                value={formData.details}
                                onChange={handleChange}
                                name="details"
                                placeholder="Chi tiết về báo cáo..."
                            />
                            <div className={styles.reviewButtonGroup}>
                                <button onClick={handleCloseReportModal}>Trở Lại</button>
                                <button onClick={() => handleSubmitReport(selectedCard)}>Gửi Báo Cáo</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {data && data.length > 0 && (
                <>
                    <div
                        style={{
                            minHeight: "80px", position: "relative"
                        }}
                    >
                        <ul style={{
                            marginTop: "28px", marginBottom: "10px", position: "absolute",
                            left: "45%",
                            transform: "translate(-50%)",
                        }}>
                            <PageNavigation
                                page={page}
                                setPage={setPage}
                                totalPages={totalPages}
                            />
                        </ul>
                        <ul style={{ float: "right", marginTop: "12px", position: "absolute", right: "5%" }} >
                            <PageSize pageSize={pageSize} setPageSize={setPageSize} />
                        </ul>
                    </div>
                </>
            )}
        </>
    );
};

export default Complete;
