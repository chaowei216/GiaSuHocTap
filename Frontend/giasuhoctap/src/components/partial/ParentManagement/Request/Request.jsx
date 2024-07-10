import React, { useEffect, useState } from 'react';
import styles from './Request.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser, faCircleQuestion, faCoins, faStar } from '@fortawesome/free-solid-svg-icons';
import PageNavigation from '../../TutorManagement/PageNavigation';
import PageSize from '../../TutorManagement/PageSize';
import { GetParentRequest, HireTutorMore } from '../../../../api/ParentHistory';
import { toast } from 'react-toastify';
import useAuth from '../../../../hooks/useAuth';
import NoDataPage from '../../../global/NoDataPage';
import InventoryIcon from "@mui/icons-material/Inventory";
import { Link } from '@mui/material';

const Request = () => {
    const { user } = useAuth()
    const [totalPages, setTotalPages] = useState();
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(5);
    const [data, setData] = useState([]);
    useEffect(() => {
        const getAllNotification = async () => {
            const response = await GetParentRequest("Online", "Đã chấp nhận", page, pageSize);
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

    const handleAddHours = async (value) => {
        const timeTable = value?.requestTimes[0]?.timeTable
        if (timeTable) {
            const dataUpdate = {
                tutorId: timeTable.tutorId,
                requestId: value.requestId
            }
            const response = await HireTutorMore(dataUpdate)
            if (response.ok) {
                const reponseJson = await response.json();
                if (reponseJson.statusCode == 201) {
                    toast.success("Thuê gia sư thêm 1 tiếng thành công")
                    setTimeout(() => {
                        window.location.reload();
                    }, 2500);
                } else {
                    toast.error(response.message)
                }
            } else {
                toast.error("Lỗi sever")
            }
        }
        setIsModalOpen(false);
    };

    const handleLinkClick = (event, url) => {
        event.preventDefault();
        window.open(url, '_blank');
    };

    const getUniqueName = (requestTimes) => {
        console.log(requestTimes);
        // const test = []
        // test.push(requestTimes)
        // console.log(test);
        const uniqueDays = new Set();
        return requestTimes.reduce((acc, timeTable) => {
            if (!uniqueDays.has(timeTable.timeTable.fullname)) {
                uniqueDays.add(timeTable.timeTable.fullname);
                acc.push(`${timeTable.timeTable.fullname}`);
            }
            console.log(acc);
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
                                        <h1 key={index}>Gia sư: {getUniqueName(card?.requestTimes)}</h1>
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
                                        <p>{getTimeFormat(card?.requestTimes)}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p>Buổi:</p>
                                        <p>{getPeriod(card?.requestTimes)}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p style={{ fontSize: "large", color: "green", fontWeight: "bold" }}>Google Meet:</p>
                                        <Link sx={{fontSize: "large"}} href="#" onClick={(event) => handleLinkClick(event, card.linkMeet)}
                                            underline="always">
                                            {card.linkMeet || "Chưa có link meet"}
                                        </Link>
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
                                    <div onClick={() => handleEvaluateClick(card)} className={styles.evaluate}>
                                        <button>THÊM GIỜ</button>
                                    </div>
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
                            <h1>Thuê thêm giờ</h1>
                        </div>
                        <div className={styles.historyContentEvaluate} style={{ marginLeft: '50px' }}>
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
                                <div className={styles.detailItem}>
                                    <p>Giờ học:</p>
                                    <p>{getTimeFormat(selectedCard?.requestTimes)}</p>
                                </div>
                                <div className={styles.detailItem}>
                                    <p>Buổi:</p>
                                    <p>{getPeriod(selectedCard?.requestTimes)}</p>
                                </div>
                                <div className={styles.detailItem}>
                                    <p>Số xu dư:</p>
                                    <p>{user?.coinBalance}</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.extendBox}>
                            <select className={styles.extendSelect} onChange={handleAdditionalHoursChange} value={additionalHours}>
                                <option value="1">1 giờ</option>
                            </select>
                            <div className={styles.additionalCoins}>
                                <FontAwesomeIcon icon={faCoins} className={styles.icon} />
                                <p> Số xu cần trả: </p>
                                <div style={{ fontSize: '25px', marginLeft: '10px', color: '#4dccda' }}>
                                    50
                                </div>
                            </div>
                        </div>
                        <div className={styles.reviewButtonGroupExtend}>
                            <button className={styles.closeHoursButton} onClick={handleCloseModal}>Hủy</button>
                            <button className={styles.addHoursButton} onClick={() => handleAddHours(selectedCard)}>Thêm Giờ</button>
                        </div>
                    </div>
                </div>
            )}
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

export default Request;
