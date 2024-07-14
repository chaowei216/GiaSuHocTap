import React, { useEffect, useState } from 'react';
import styles from './Complete.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser, faCircleQuestion, faCoins, faStar, faTimes } from '@fortawesome/free-solid-svg-icons';
import PageSize from '../../TutorManagement/PageSize';
import PageNavigation from '../../TutorManagement/PageNavigation';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { FeedbackTutor, GetParentRequest, ReportTutor } from '../../../../api/ParentHistory';
import InventoryIcon from "@mui/icons-material/Inventory";
import useAuth from '../../../../hooks/useAuth';
const CompleteOffline = () => {
    const { user } = useAuth()
    const [totalPages, setTotalPages] = useState();
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(5);
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        reportTitle: '', // Lý do báo cáo
        description: '', // Chi tiết về báo cáo
    });
    const [rating, setRating] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [message, setMessage] = useState('');
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [feedbackMsg, setFeedbackMsg] = useState('');
    const [isReported, setIsReported] = useState(false);
    const [isFeedback, setIsFeedback] = useState(false);
    useEffect(() => {
        const getAllNotification = async () => {
            const response = await GetParentRequest("Offline", "Hoàn thành", page, pageSize);
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
        if (user) {
            const dataReport = {
                ...formData,
                userId: user?.userId,
                tutorId: value?.requestTimes[0]?.timeTable.tutorId
            }
            const response = await ReportTutor(dataReport)
            if (response.ok) {
                const reponseJson = await response.json();
                if (reponseJson.statusCode == 201) {
                    toast.success("Đánh giá thành công")
                } else {
                    toast.error(response.message)
                }
            } else {
                toast.error("Lỗi sever")
            }
            setIsReportModalOpen(false);
            setSelectedCard(null);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmitFeedback = async (value) => {
        if (user) {
            console.log(feedbackMsg);
            console.log(rating);
            const dataFeedback = {
                description: feedbackMsg,
                rating: Number(rating),
                fromId: user?.userId,
                toId: value?.requestTimes[0]?.timeTable.tutorId
            }
            const response = await FeedbackTutor(dataFeedback)
            if (response.ok) {
                const reponseJson = await response.json();
                if (reponseJson.statusCode == 200) {
                    toast.success("Đánh giá thành công")
                } else {
                    toast.error(response.message)
                }
            } else {
                toast.error("Lỗi sever")
            }
            setIsReportModalOpen(false);
            setSelectedCard(null);
        }
    };
    const getUniqueName = (requestTimes) => {
        // const test = []
        // test.push(requestTimes)
        // console.log(test);
        const uniqueDays = new Set();
        return requestTimes.reduce((acc, timeTable) => {
            if (!uniqueDays.has(timeTable.timeTable.fullname)) {
                uniqueDays.add(timeTable.timeTable.fullname);
                acc.push(`${timeTable.timeTable.fullname}`);
            }
            return acc;
        }, []);
    };

    const getTimeFormat = (requestTimes) => {
        if (!requestTimes || requestTimes.length === 0) return "Không có thời gian";

        // Sort the time ranges by startTime
        const sortedTimes = requestTimes.sort((a, b) => {
            const aStartTime = new Date(`1970-01-01T${a.timeTable.startTime}:00Z`);
            const bStartTime = new Date(`1970-01-01T${b.timeTable.startTime}:00Z`);
            return aStartTime - bStartTime;
        });

        // Get the startTime of the first range and endTime of the last range
        const startTime = sortedTimes[0].timeTable.startTime;
        const endTime = sortedTimes[sortedTimes.length - 1].timeTable.endTime;

        return `${startTime} - ${endTime}`;
    };

    const getPeriod = (requestTimes) => {
        if (!requestTimes || requestTimes.length === 0) return "Không có thời gian";

        // Lấy danh sách các khoảng thời gian (period) từ requestTimes
        const periods = requestTimes.map(item => item.timeTable.period);

        // Loại bỏ các giá trị trùng lặp
        const uniquePeriods = [...new Set(periods)];

        // Ghép các khoảng thời gian lại thành một chuỗi với dấu phẩy và dấu cách
        return uniquePeriods.join(', ');
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
                                            <h1 key={index}>Gia sư: {getUniqueName(card.requestTimes)}</h1>
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
                                            <p>Lương đề xuất:</p>
                                            <p>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(card.price)}</p>
                                        </div>
                                    </div>
                                </div>
                                <hr style={{ width: '97%', marginLeft: '20px', marginTop: '15px' }} />
                                <div className={styles.historyCoin}>
                                    <div className={styles.coinIcon}>
                                        <FontAwesomeIcon icon={faCoins} className={styles.icon} />
                                        <p>Phí dịch vụ:</p>
                                        <h1>10 xu</h1>
                                    </div>
                                </div>
                                <div className={styles.historyFeedback}>
                                    <div className={styles.feedbackButton} style={{ gap: "15px" }}>
                                        <Button onClick={() => handleReportClick(card)} sx={{ fontWeight: "bold" }} color='error' variant='contained' className={styles.report}>Báo cáo</Button>
                                        <Button onClick={() => handleEvaluateClick(card)} sx={{ fontWeight: "bold", background: "#4db4da", color: "white" }} variant='contained' className={styles.evaluate}>Đánh Giá</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {data && data.length === 0 &&
                    <div className='flex justify-center items-center' style={{ marginTop: "20px", width: "100%", height: "100px", background: "white" }}>
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
                                        <h1>Gia sư: {getUniqueName(selectedCard?.requestTimes)}</h1>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p>Môn học:</p>
                                        <p style={{ color: '#0000FF' }}>{selectedCard.courseName}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p>Lớp học:</p>
                                        <p style={{ color: '#0000FF' }}>{selectedCard.className}</p>
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
                                        <h1>Gia sư: {getUniqueName(selectedCard?.requestTimes)}</h1>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p>Môn học:</p>
                                        <p style={{ color: '#0000FF' }}>{selectedCard.courseName}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p>Lớp học:</p>
                                        <p style={{ color: '#0000FF' }}>{selectedCard.className}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.reportSelect}>
                                <select
                                    className={styles.selectReason}
                                    value={formData.reason}
                                    onChange={handleChange}
                                    name="reportTitle"
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
                                name="description"
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

export default CompleteOffline;
