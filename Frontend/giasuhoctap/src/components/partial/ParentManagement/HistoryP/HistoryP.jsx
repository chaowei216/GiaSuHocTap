import React, { useEffect, useState } from 'react';
import styles from './HistoryP.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser, faCircleQuestion, faCoins, faStar } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../../../hooks/useAuth';
import { GetParentRequest } from '../../../../api/ParentHistory';
import { toast } from 'react-toastify';
import PageNavigation from '../../TutorManagement/PageNavigation';
import PageSize from '../../TutorManagement/PageSize';
import InventoryIcon from "@mui/icons-material/Inventory";

const HistoryP = () => {
    const { user } = useAuth()
    const [totalPages, setTotalPages] = useState();
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(5);
    const [data, setData] = useState([]);
    useEffect(() => {
        if (user?.userId) {
            const getAllNotification = async () => {
                const response = await GetParentRequest(user?.userId, "Online", "Chờ xác nhận", page, pageSize);
                if (response.ok) {
                    const responseJson = await response.json();
                    const data = responseJson.data.data;
                    setData(data);
                    setTotalPages(responseJson.data.totalPages)
                } else {
                    toast.error("Lỗi server")
                }
            }
            getAllNotification();
        }
    }, [page, totalPages, pageSize, user?.userId])
    const getUniqueName = (requestTimes) => {
        const uniqueDays = new Set();
        return requestTimes.reduce((acc, timeTable) => {
            if (!uniqueDays.has(timeTable.timeTable.fullname)) {
                uniqueDays.add(timeTable.timeTable.fullname);
                acc.push(`${timeTable.timeTable.fullname}`);
            }
            return acc;
        }, []);
    };
    return (
        <>
            <div>
                {data && data.map((card, index) => (
                    <div style={{ width: "100%" }} key={index}>
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
                                            <p>Ngày tạo:</p>
                                            <p>{card.createdDate.split("T")[0]}</p>
                                        </div>
                                        {card.requestTimes?.map((item, index) => (
                                            (item.status == "Chờ xác nhận" && (
                                                <div key={index} className={styles.detailItem}>
                                                    <React.Fragment key={index + 1}>
                                                        <p>Thời gian:</p>
                                                        <p key={index}>{item.timeTable.startTime} - {item.timeTable.endTime}</p>
                                                    </React.Fragment>

                                                </div>
                                            ))
                                        ))}
                                        <div className={styles.detailItem}>
                                            <p>Mô tả:</p>
                                            <p>{card.description || "Không có mô tả"}</p>
                                        </div>
                                    </div>
                                </div>
                                <hr style={{ width: '97%', marginLeft: '20px', marginTop: '25px' }} />
                                <div className={styles.historyCoin}>
                                    <div className={styles.coinIcon}>
                                        <FontAwesomeIcon icon={faCoins} className={styles.icon} />
                                        <p>Giá tiền:</p>
                                        <h1>{card.coin || "0"} Xu</h1>
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

export default HistoryP;
