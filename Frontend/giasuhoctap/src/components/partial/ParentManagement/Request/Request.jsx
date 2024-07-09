import React, { useEffect, useState } from 'react';
import styles from './Request.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser, faCircleQuestion, faCoins, faStar } from '@fortawesome/free-solid-svg-icons';
import PageNavigation from '../../TutorManagement/PageNavigation';
import PageSize from '../../TutorManagement/PageSize';
import { GetParentRequest } from '../../../../api/ParentHistory';
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
    // Dữ liệu mẫu các card


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

    const handleLinkClick = (event, url) => {
        event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết
        window.open(url, '_blank'); // Mở liên kết trong tab mới
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
                                        <h1>Tên nè</h1>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p style={{ fontSize: "large", color: "green", fontWeight: "bold" }}>Link meet url:</p>
                                        <Link href="#" onClick={(event) => handleLinkClick(event, card.linkMeet)}
                                            underline="always">
                                            {card.linkMeet}
                                        </Link>
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
                                        <p>Ngày dạy:</p>
                                        <p>Thứ 2, thứ 3</p>
                                    </div>
                                </div>
                            </div>
                            <hr style={{ width: '97%', marginLeft: '20px', marginTop: '15px' }} />
                            <div className={styles.historyCoin}>
                                <div className={styles.coinIcon}>
                                    <FontAwesomeIcon icon={faCoins} className={styles.icon} />
                                    <p>Thành coin:</p>
                                    <h1>{card.coin}</h1>
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
                            <h1>Thuê thêm giờ</h1>
                        </div>
                        <div className={styles.historyContentEvaluate} style={{ marginLeft: '50px' }}>
                            <div className={styles.historyImgEvaluate}>
                                <img src="/img/tutor.jpg" alt="Profile" />
                            </div>
                            <div className={styles.historyDetail}>
                                <div className={styles.detailItem}>
                                    <h1>Tên nè</h1>
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
                                    <p>Ngày dạy:</p>
                                    <p>Thứ 2, thứ 3</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.extendBox}>
                            <select className={styles.extendSelect} onChange={handleAdditionalHoursChange} value={additionalHours}>
                                <option selected value="1">1 giờ</option>
                            </select>
                            <div className={styles.additionalCoins}>
                                <FontAwesomeIcon icon={faCoins} className={styles.icon} />
                                <p> Số coin cần trả: </p>
                                <div style={{ fontSize: '25px', marginLeft: '10px', color: '#4dccda' }}>
                                    50
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
