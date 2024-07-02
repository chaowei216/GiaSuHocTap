import { useEffect, useState } from 'react';
import HiringTuor from '../../TutorDetail/HiringTuor';
import styles from './BookTutor.module.css';
import { toast } from 'react-toastify';
import { GetTutorTeachOffline } from '../../../../api/TutorManagementApi';
import emptyPicture from "/img/empty.png"
import PageNavigation from '../../TutorManagement/PageNavigation';
import PageSize from '../../TutorManagement/PageSize';

const baseUrl = import.meta.env.VITE_API_HOST;
const BookTutorOffline = () => {
    const [totalPages, setTotalPages] = useState();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [tutorHire, setTutorHire] = useState()
    const [tutorList, setTutorList] = useState()
    useEffect(() => {
        const fetchAllTutor = async () => {
            const response = await GetTutorTeachOffline(page, pageSize);
            console.log(response);
            if (response.ok) {
                const responseJson = await response.json();
                console.log(responseJson);
                const user = responseJson.data.data
                setTutorList(user);
                setTotalPages(responseJson.data.totalPages)
            } else {
                toast.error("Error fetching data")
            }
        };
        fetchAllTutor();
    }, [page, pageSize]);
    return (
        <>
            <div className={styles.slideBox} style={{ width: '100%', height: '100%' }}>
                <div className={styles.slideReTutor}>
                    <div className={styles.slideBgTu}>
                        <h1>DANH SÁCH GIA SƯ OFFLINE</h1>
                    </div>
                    <div className={`slide-container ${styles.slideContainer}`}>
                        <div className={`slide-content ${styles.slideContent}`}>
                            <div className={`card-wrapper ${styles.cardWrapper}`}>
                                {tutorList && tutorList.map((tutor, index) => (
                                    <div key={index} className={`card ${styles.card}`}>
                                        <div className={`image-content ${styles.imageContent}`}>
                                            <span className={`overlay ${styles.overlay}`}></span>
                                            <div className={`card-image ${styles.cardImage}`}>
                                                <img
                                                    className={`card-img ${styles.cardImg}`}
                                                    src={`${baseUrl}/api/Auth/user-image?fileName=${tutor?.userImage}`}
                                                    onError={(e) => {
                                                        e.currentTarget.src = emptyPicture;
                                                    }}
                                                    alt="project-image"
                                                />
                                            </div>
                                        </div>
                                        <div className={`card-content ${styles.cardContent}`}>
                                            <h2 className={`name ${styles.name}`}>{tutor.fullname}</h2>
                                            <div className={styles.cardSubject}>
                                                <p className={styles.cardTitle}>Môn dạy: </p>
                                                <p className={`class ${styles.subject}`}>{tutor.tutorDetail.major}</p>
                                            </div>
                                            <div className={styles.cardSubject}>
                                                <p className={styles.cardTitle}>Lớp dạy: </p>
                                                <p className={`class ${styles.class}`}>12</p>
                                            </div>
                                            <div className={styles.cardSubject}>
                                                <p className={styles.cardTitle}>Tiền lương: </p>
                                                <p className={`wage ${styles.wage}`}>100 Coin</p>
                                            </div>
                                            <div className={styles.cardSubject}>
                                                <p className={styles.cardTitle}>Hình thức dạy: </p>
                                                <p className={`teachingForm ${styles.teachingForm}`}>{tutor.teachingForm}</p>
                                            </div>
                                            <div className={styles.cardSubject}>
                                                <p className={styles.cardTitle}>Ngày trong tuần: </p>
                                                <p className={`dayOfWeek ${styles.dayOfWeek}`}>{tutor.dayOfWeek}</p>
                                            </div>
                                        </div>
                                        <button className={`button ${styles.button}`}>Đăng ký</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {tutorList && tutorList.length > 0 && (
                <>
                    <div
                        style={{
                            position: "relative",
                            minHeight: "80px"
                        }}
                    >
                        <ul style={{
                            marginTop: "28px", marginBottom: "10px", position: "absolute",
                            left: "50%",
                            transform: "translate(-50%)",
                        }}>
                            <PageNavigation
                                page={page}
                                setPage={setPage}
                                totalPages={totalPages}
                            />
                        </ul>
                        <ul style={{ float: "right", marginTop: "12px" }} >
                            <PageSize pageSize={pageSize} setPageSize={setPageSize} />
                        </ul>
                    </div>
                </>
            )}
        </>
    );
};

export default BookTutorOffline;
