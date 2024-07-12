import { useEffect, useState } from 'react';
import HiringTuor from '../../TutorDetail/HiringTuor';
import styles from './BookTutor.module.css';
import { toast } from 'react-toastify';
import { GetTutorTeachOffline, GetTutorTeachOfflineByCondition } from '../../../../api/TutorManagementApi';
import emptyPicture from "/img/empty.png"
import PageNavigation from '../../TutorManagement/PageNavigation';
import PageSize from '../../TutorManagement/PageSize';
import HiringTuorOffline from './HiringTuorOffline';
import { GetAllClass, GetAllCourse } from '../../../../api/ResigerTutorApi';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import InventoryIcon from "@mui/icons-material/Inventory";

const baseUrl = import.meta.env.VITE_API_HOST;
const BookTutorOffline = () => {
    const [totalPages, setTotalPages] = useState();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [tutorHire, setTutorHire] = useState()
    const [tutorList, setTutorList] = useState()
    const [classId, setClassId] = useState("");
    const [courseId, setCourseId] = useState("");
    const [classList, setClassList] = useState([]);
    const [courseList, setCourseList] = useState([]);
    const [isSearch, setIsSearch] = useState(false)
    useEffect(() => {
        const fetchAllTutor = async () => {
            if (isSearch) {
                if ((classId || courseId) != "") {
                    const response = await GetTutorTeachOfflineByCondition(classId, courseId, page, pageSize);
                    if (response.ok) {
                        const responseJson = await response.json();
                        const user = responseJson.data.data
                        setTutorList(user);
                        setTotalPages(responseJson.data.totalPages)
                        setIsSearch(true)
                    } else {
                        toast.error("Lỗi sever")
                    }
                } else {
                    const response = await GetTutorTeachOffline(page, pageSize);
                    if (response.ok) {
                        const responseJson = await response.json();
                        const user = responseJson.data.data
                        setTutorList(user);
                        setTotalPages(responseJson.data.totalPages)
                        setIsSearch(false)
                    } else {
                        toast.error("Lỗi sever")
                    }
                }
            } else {
                const response = await GetTutorTeachOffline(page, pageSize);
                if (response.ok) {
                    const responseJson = await response.json();
                    const user = responseJson.data.data
                    setTutorList(user);
                    setTotalPages(responseJson.data.totalPages)
                } else {
                    toast.error("Lỗi sever")
                }
            }
        };
        fetchAllTutor();
    }, [page, pageSize, isSearch]);
    useEffect(() => {
        const fetchClass = async () => {
            const response = await GetAllClass();
            if (response.statusCode == 200) {
                const list = response.data
                setClassList(list);
            } else {
                toast.error("Error fetching data")
            }
        };
        const fetchCourse = async () => {
            const response = await GetAllCourse();
            if (response.statusCode == 200) {
                const list = response.data
                setCourseList(list);
            } else {
                toast.error("Error fetching data")
            }
        };
        fetchClass();
        fetchCourse();
    }, [])
    const handleFilter = async () => {
        setPage(1)
        if ((classId || courseId) != "") {
            const response = await GetTutorTeachOfflineByCondition(classId, courseId, page, pageSize);
            if (response.ok) {
                const responseJson = await response.json();
                const user = responseJson.data.data
                setTutorList(user);
                setTotalPages(responseJson.data.totalPages)
                setIsSearch(true)
            } else {
                toast.error("Lỗi sever")
            }
        } else {
            setIsSearch(false)
        }
    }
    const handleReset = async () => {
        setPage(1)
        setClassId("")
        setCourseId("")
        const response = await GetTutorTeachOffline(page, pageSize);
        if (response.ok) {
            const responseJson = await response.json();
            const user = responseJson.data.data
            setTutorList(user);
            setTotalPages(responseJson.data.totalPages)
            setIsSearch(false)
        } else {
            toast.error("Lỗi sever")
        }
    }
    const [basicModal, setBasicModal] = useState(false);
    const handleHire = (item) => {
        setTutorHire(item);
        setBasicModal(true);
    }
    const translateDayOfWeek = (dayOfWeek) => {
        const daysInVietnamese = {
            Monday: 'Thứ 2, ',
            Tuesday: 'Thứ 3, ',
            Wednesday: 'Thứ 4, ',
            Thursday: 'Thứ 5, ',
            Friday: 'Thứ 6',
            Saturday: 'Thứ 7, ',
        };
        console.log([dayOfWeek]);
        return daysInVietnamese[dayOfWeek] || dayOfWeek;
    };
    const getUniqueDays = (timeTables) => {
        const uniqueDays = new Set();
        return timeTables.reduce((acc, timeTable) => {
            if (!uniqueDays.has(timeTable.dayOfWeek)) {
                uniqueDays.add(timeTable.dayOfWeek);
                acc.push(`${translateDayOfWeek(timeTable.dayOfWeek)}`);
            }
            return acc;
        }, []);
    };
    return (
        <>
            <div className={styles.slideBox} style={{ width: '100%', height: '100%' }}>
                <div className={styles.slideReTutor}>
                    <div className={styles.slideBgTu}>
                        <h1>DANH SÁCH GIA SƯ OFFLINE</h1>
                    </div>
                    <div style={{ position: "absolute", left: "20%" }}>
                        <div style={{ marginBottom: "20px" }}>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">Lớp học</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={classId}
                                    onChange={(event) => setClassId(event.target.value)}
                                    label="Lớp học"
                                >
                                    {classList && classList.map((item, index) => (
                                        <MenuItem key={index} value={item.classId}>
                                            {item.className}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">Môn học</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={courseId}
                                    onChange={(event) => setCourseId(event.target.value)}
                                    label="Môn học"
                                >
                                    {courseList && courseList.map((item, index) => (
                                        <MenuItem key={index} value={item.courseId}>
                                            {item.courseName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button sx={{ marginTop: "20px", marginRight: "10px" }} onClick={handleFilter} variant="contained">Tìm</Button>
                            <Button sx={{ marginTop: "20px" }} onClick={handleReset} variant="contained">Reset</Button>
                        </div>
                    </div>
                    <div className={`slide-container ${styles.slideContainer}`}>
                        <div className={`slide-content ${styles.slideContent}`}>
                            <div className={`card-wrapper ${styles.cardWrapper}`}>
                                {tutorList && tutorList.length <= 0 && (
                                    <div style={{ widows: "100%", marginTop: "70px", position: "relative", left: "130%" }}>
                                        <div
                                            style={{ fontWeight: "600"}}
                                        >
                                            <InventoryIcon />
                                            Không có dữ liệu
                                        </div>
                                    </div>
                                )}
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
                                                <p className={`teachingForm ${styles.teachingForm}`}>
                                                    Offline
                                                </p>
                                            </div>
                                            <div className={styles.cardSubject}>
                                                <p className={styles.cardTitle}>Ngày trong tuần: </p>
                                                <p className={`dayOfWeek ${styles.dayOfWeek}`}>
                                                    {getUniqueDays(tutor.timeTables)}
                                                </p>
                                            </div>
                                        </div>
                                        <button onClick={() => handleHire(tutor)} className={`button ${styles.button}`}>Đăng ký</button>
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
            <HiringTuorOffline basicModal={basicModal} setBasicModal={setBasicModal} data={tutorHire} />
        </>
    );
};

export default BookTutorOffline;
