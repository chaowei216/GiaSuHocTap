import React, { useEffect, useState } from 'react';
import styles from './Cancelled.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser, faCircleQuestion, faCoins, faStar, faTimes } from '@fortawesome/free-solid-svg-icons';
import PageNavigation from '../../TutorManagement/PageNavigation';
import PageSize from '../../TutorManagement/PageSize';
import { toast } from 'react-toastify';
import useAuth from '../../../../hooks/useAuth';
import { GetParentRequest } from '../../../../api/ParentHistory';
import InventoryIcon from "@mui/icons-material/Inventory";

const CancelledOffline = () => {
    const { user } = useAuth()
    const [totalPages, setTotalPages] = useState();
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(5);
    const [data, setData] = useState([]);
    useEffect(() => {
        const getAllNotification = async () => {
            const response = await GetParentRequest("Offline", "Từ chối", page, pageSize);
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
    console.log(data);

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
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {data && data.length === 0 &&
                <div className='flex justify-center items-center' style={{ marginTop: "20px", width: "100%", height: "100px", background: "white" }}>
                    <InventoryIcon />
                    Không có dữ liệu
                </div>
            }
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

export default CancelledOffline;
