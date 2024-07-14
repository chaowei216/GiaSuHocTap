import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { GetAllClass, GetAllCourse } from '../../../../api/ResigerTutorApi';
import useAuth from '../../../../hooks/useAuth'
import { UpdateTutor } from '../../../../api/UpdateTutorApi';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import { Logout } from '../../../../api/AuthenApi';


const Profile = () => {
    const [teachingMode, setTeachingMode] = useState(false); // Đặt giá trị ban đầu là false
    const [youtubeLink, setYoutubeLink] = useState('');
    const [classes, setClasses] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedDayOfWeekOnline, setSelectedDayOfWeekOnline] = useState([]);
    const [selectedDayOfWeekOffline, setSelectedDayOfWeekOffline] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [selectedClasses, setSelectedClasses] = useState([]);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const data = await GetAllClass();
                console.log('Classes fetched:', data);
                if (data.error) {
                    console.log('Lỗi server:', data.error);
                } else {
                    setClasses(data.data);
                }
            } catch (error) {
                console.log('Error fetching classes:', error);
            }
        };

        const fetchCourses = async () => {
            try {
                const data = await GetAllCourse();
                console.log('Courses fetched:', data);
                if (data.error) {
                    console.log('Error fetching courses:', data.error);
                } else {
                    setCourses(data.data);
                }
            } catch (error) {
                console.log('Error fetching courses:', error);
            }
        };

        fetchClasses();
        fetchCourses();
    }, []);

    const DayOfWeekOnline = [
        { label: 'Sáng Thứ 2', value: ['Monday', 'Afternoon', '13-17'] },
        { label: 'Chiều Thứ 2', value: ['Monday', 'Afternoon', '13-17'] },
        { label: 'Tối Thứ 2', value: ['Monday', 'Evening', '18-21'] },
        { label: 'Sáng Thứ 3', value: ['Tuesday', 'Morning', '8-12'] },
        { label: 'Chiều Thứ 3', value: ['Tuesday', 'Afternoon', '13-17'] },
        { label: 'Tối Thứ 3', value: ['Tuesday', 'Evening', '18-21'] },
        { label: 'Sáng Thứ 4', value: ['Wednesday', 'Morning', '8-12'] },
        { label: 'Chiều Thứ 4', value: ['Wednesday', 'Afternoon', '13-17'] },
        { label: 'Tối Thứ 4', value: ['Wednesday', 'Evening', '18-21'] },
        { label: 'Sáng Thứ 5', value: ['Thursday', 'Morning', '8-12'] },
        { label: 'Chiều Thứ 5', value: ['Thursday', 'Afternoon', '13-17'] },
        { label: 'Tối Thứ 5', value: ['Thursday', 'Evening', '18-21'] },
        { label: 'Sáng Thứ 6', value: ['Friday', 'Morning', '8-12'] },
        { label: 'Chiều Thứ 6', value: ['Friday', 'Afternoon', '13-17'] },
        { label: 'Tối Thứ 6', value: ['Friday', 'Evening', '18-21'] },
        { label: 'Sáng Thứ 7', value: ['Saturday', 'Morning', '8-12'] },
        { label: 'Chiều Thứ 7', value: ['Saturday', 'Afternoon', '13-17'] },
        { label: 'Tối Thứ 7', value: ['Saturday', 'Evening', '18-21'] },
    ];

    const DayOfWeekOffline = [
        { label: 'Sáng Thứ 2', value: ['Monday', 'Afternoon', '13-17'] },
        { label: 'Chiều Thứ 2', value: ['Monday', 'Afternoon', '13-17'] },
        { label: 'Tối Thứ 2', value: ['Monday', 'Evening', '18-21'] },
        { label: 'Sáng Thứ 3', value: ['Tuesday', 'Morning', '8-12'] },
        { label: 'Chiều Thứ 3', value: ['Tuesday', 'Afternoon', '13-17'] },
        { label: 'Tối Thứ 3', value: ['Tuesday', 'Evening', '18-21'] },
        { label: 'Sáng Thứ 4', value: ['Wednesday', 'Morning', '8-12'] },
        { label: 'Chiều Thứ 4', value: ['Wednesday', 'Afternoon', '13-17'] },
        { label: 'Tối Thứ 4', value: ['Wednesday', 'Evening', '18-21'] },
        { label: 'Sáng Thứ 5', value: ['Thursday', 'Morning', '8-12'] },
        { label: 'Chiều Thứ 5', value: ['Thursday', 'Afternoon', '13-17'] },
        { label: 'Tối Thứ 5', value: ['Thursday', 'Evening', '18-21'] },
        { label: 'Sáng Thứ 6', value: ['Friday', 'Morning', '8-12'] },
        { label: 'Chiều Thứ 6', value: ['Friday', 'Afternoon', '13-17'] },
        { label: 'Tối Thứ 6', value: ['Friday', 'Evening', '18-21'] },
        { label: 'Sáng Thứ 7', value: ['Saturday', 'Morning', '8-12'] },
        { label: 'Chiều Thứ 7', value: ['Saturday', 'Afternoon', '13-17'] },
        { label: 'Tối Thứ 7', value: ['Saturday', 'Evening', '18-21'] },
    ];

    const handleYoutubeLinkChange = (event) => {
        setYoutubeLink(event.target.value);
    };

    const handleTeachingModeChange = (event) => {
        const value = event.target.value === 'true'; // Chuyển đổi giá trị từ string sang boolean
        setTeachingMode(value);
    };

    const handleDayCheckboxDayChange = (event, setState, state) => {
        const value = JSON.parse(event.target.value);
        if (event.target.checked) {
            setState([...state, value]);
        } else {
            setState(state.filter(item => JSON.stringify(item) !== JSON.stringify(value)));
        }
    };

    const handleCheckboxChange = (event, setState, state) => {
        const value = parseInt(event.target.value, 10); // Chuyển đổi giá trị thành số nguyên
        if (event.target.checked) {
            setState([...state, value]);
        } else {
            setState(state.filter(item => item !== value));
        }
    };

    const handleSubmit = async () => {
        console.log('LinkYoutube:', youtubeLink);
        console.log('isOfflineTeaching:', teachingMode);
        console.log('DayOfWeekOnline:', selectedDayOfWeekOnline);
        console.log('DayOfWeekOffline:', selectedDayOfWeekOffline);
        console.log('Subjects:', selectedSubjects);
        console.log('Classes:', selectedClasses);
        console.log('tutorId:', user?.userId)

        const updateTutor = {
            tutorId: user?.userId,
            subjects: selectedSubjects,
            classes: selectedClasses,
            isOfflineTeaching: teachingMode,
            youtubeLink: youtubeLink,
            dayOfWeekOnline: selectedDayOfWeekOnline,
            dayOfWeekOffline: selectedDayOfWeekOffline,
        };

        console.log('updateTutor:', updateTutor);

        const response = await UpdateTutor(updateTutor);
        if (response.ok) {
            const responseJson = await response.json();
            if (responseJson.statusCode === 400) {
                toast.error(responseJson.message);
            } else {
                toast.success('Cập nhật thành công');
                navigate("/checking-page")
            }
        } else {
            toast.error('Lỗi sever');
        }
    };

    const handleClickLogout = async () => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken == null || refreshToken == undefined) {
            await logout();
            navigate("/login")
            return;
        }
        const response = await Logout(refreshToken)
        if (response.ok) {
            await logout();
            navigate("/login")
        }
    }

    return (
        <div className={`profileBox ${styles.profileBox}`} style={{ width: '100%', height: '100%', backgroundColor: '#F0F9FC' }}>
            <div className={styles.profileBody} style={{ backgroundColor: 'white' }}>
                <div className='container mr-4' style={{ borderBottom: '1px solid #679312', paddingBottom: '10px', paddingTop: '10px', width: '95%' }}>
                    <div className={styles.profileReTutor}>
                        <div className={styles.profileBgTu}>
                            <h1>Cập nhật thông tin gia sư</h1>
                        </div>
                        <div className={styles.profileContent}>
                            <p>Để nhận được lớp dạy, Bạn phải đăng ký tài khoản gia sư. Tài khoản gia sư chỉ cần đăng ký 1 lần duy nhất (lần đầu tiên), Lần sau nhận lớp bạn không cần đăng ký nữa.</p>
                            <p>Gia sư bấm vào nút "XEM VIDEO HD" để được hướng dẫn cách đăng ký làm gia sư, xem
                                <span style={{ color: 'red', fontWeight: 'bold' }}> quy trình </span>
                                giao và nhận lớp của trung tâm, thông tin giải đáp các vấn đề thường gặp trong quá trình nhận lớp, để
                                <strong> tránh </strong>
                                các sự cố phát sinh khi nhận lớp.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="container mt-4">
                    <div className={styles.profileTime}>
                        <div className='boxNameSubject mb-2' style={{ width: '20%', fontWeight: '600', paddingLeft: '30px' }}>Link Youtube:</div>
                        <div className={`form-check ${styles.subjectGrid}`}>
                            <Form.Control type="text" placeholder="Nhập link Youtube nếu có ở đây" style={{ width: '150%' }} onChange={handleYoutubeLinkChange} value={youtubeLink} />
                        </div>
                    </div>
                </div>
                <hr style={{ width: '95%', marginLeft: '20px' }} />
                <div className="container mt-4">
                    <div className={styles.profileTime}>
                        <div className='boxNameSubject mb-2' style={{ width: '20%', fontWeight: '600', paddingLeft: '30px' }}>Hình thức dạy:</div>
                        <div className={`form-check ${styles.subjectGrid}`}>
                            <select className="form-select" aria-label="Default select example" style={{ width: '135%' }} onChange={handleTeachingModeChange}>
                                <option value="">Chọn Hình Thức Dạy</option>
                                <option value="false">Dạy Online</option>
                                <option value="true">Dạy Online và Offline</option>
                            </select>
                        </div>
                    </div>
                    <hr style={{ width: '95%', marginLeft: '20px' }} />
                    <div className={styles.profileDayOfWeek}>
                        <div className='boxNameSubject mb-2' style={{ width: '20%', fontWeight: '600', paddingLeft: '30px' }}>Ngày dạy online:</div>
                        <div className={`form-check ${styles.subjectGrid}`}>
                            {DayOfWeekOnline.map((item, index) => (
                                <div key={index} className="mb-4">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={`dayOfWeekOnlineCheckbox${index}`}
                                        value={JSON.stringify(item.value)}
                                        onChange={(event) => handleDayCheckboxDayChange(event, setSelectedDayOfWeekOnline, selectedDayOfWeekOnline)}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor={`dayOfWeekOnlineCheckbox${index}`}
                                    >
                                        {item.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr style={{ width: '95%', marginLeft: '20px' }} />
                    {teachingMode && (
                        <div className={styles.profileDayOfWeek}>
                            <div className='boxNameSubject mb-2' style={{ width: '20%', fontWeight: '600', paddingLeft: '30px' }}>Ngày dạy offline:</div>
                            <div className={`form-check ${styles.subjectGrid}`}>
                                {DayOfWeekOffline.map((item, index) => (
                                    <div key={index} className="mb-4">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id={`dayOfWeekOfflineCheckbox${index}`}
                                            value={JSON.stringify(item.value)}
                                            onChange={(event) => handleDayCheckboxDayChange(event, setSelectedDayOfWeekOffline, selectedDayOfWeekOffline)}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor={`dayOfWeekOfflineCheckbox${index}`}
                                        >
                                            {item.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <hr style={{ width: '95%', marginLeft: '20px' }} />
                    <div className={styles.profileTime}>
                        <div className='boxNameSubject mb-2' style={{ width: '20%', fontWeight: '600', paddingLeft: '30px' }}>Chọn môn học:</div>
                        <div className={`form-check ${styles.subjectGrid}`}>
                            {courses.map((course, index) => (
                                <div key={index} className="mb-4">
                                    <input className="form-check-input" type="checkbox" value={course.courseId} onChange={(event) => handleCheckboxChange(event, setSelectedSubjects, selectedSubjects)} />
                                    <label className="form-check-label" htmlFor={`course-${index}`}>
                                        {course.courseName}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr style={{ width: '95%', marginLeft: '20px' }} />
                    <div className={styles.profileTime}>
                        <div className='boxNameSubject mb-2' style={{ width: '20%', fontWeight: '600', paddingLeft: '30px' }}>Chọn lớp dạy:</div>
                        <div className={`form-check ${styles.subjectGrid}`}>
                            {classes.map((item, index) => (
                                <div key={index} className="mb-4">
                                    <input className="form-check-input" type="checkbox" value={item.classId} onChange={(event) => handleCheckboxChange(event, setSelectedClasses, selectedClasses)} />
                                    <label className="form-check-label" htmlFor={`class-${index}`}>
                                        {item.className}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr style={{ width: '95%', marginLeft: '20px' }} />
                    <button className={styles.buttonProfile} onClick={handleSubmit}>Cập nhật thông tin gia sư</button>
                    <Button style={{ display: "flex", marginLeft: "10px", fontSize: "15px", marginBottom: "10px" }} onClick={handleClickLogout}>Trở về trang đăng nhập</Button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
