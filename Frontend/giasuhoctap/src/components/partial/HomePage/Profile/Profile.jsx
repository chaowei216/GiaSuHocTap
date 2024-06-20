import React, { useState } from 'react';
import styles from './Profile.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
    const [teachingMode, setTeachingMode] = useState('');

    const Subject = [
        'Toán', 'Lý', 'Hóa', 'Văn', 'Tiếng Việt',
        'Anh Văn', 'Báo Bài', 'Sinh', 'Sử', 'Địa', 'Tin Học',
        'Vẽ', 'Rèn Chữ', 'Anh Văn Giao Tiếp', 'TOEIC', 'IELTS', 'TOEFL', 'Tiếng Pháp',
        'Tiếng Hàn', 'Tiếng Hoa', 'Tiếng Nhật', 'Đàn Piano', 'Đàn Organ', 'Đàn Guitar',
        'Tiếng Việt Cho Người Nước Ngoài', 'Nhảy Hiện Đại', 'Khoa Học Tự Nhiên',
    ];

    const Class = [
        'Lớp Lá', 'Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4',
        'Lớp 5', 'Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9', 'Lớp 10',
        'Lớp 11', 'Lớp 12', 'Ôn Thi Đại Học', 'Dạy Song Ngữ', 'TOEFL',
    ];

    const DayOfWeekOnline = [
        'Sáng Thứ 2', 'Chiều Thứ 2', 'Tối Thứ 2',
        'Sáng Thứ 3', 'Chiều Thứ 3', 'Tối Thứ 3',
        'Sáng Thứ 4', 'Chiều Thứ 4', 'Tối Thứ 4',
        'Sáng Thứ 5', 'Chiều Thứ 5', 'Tối Thứ 5',
        'Sáng Thứ 6', 'Chiều Thứ 6', 'Tối Thứ 6',
        'Sáng Thứ 7', 'Chiều Thứ 7', 'Tối Thứ 7',
        'Sáng Chủ Nhật', 'Chiều Chủ Nhật', 'Tối Chủ Nhật',
    ];

    const DayOfWeekOffline = [
        'Sáng Thứ 2', 'Chiều Thứ 2', 'Tối Thứ 2',
        'Sáng Thứ 3', 'Chiều Thứ 3', 'Tối Thứ 3',
        'Sáng Thứ 4', 'Chiều Thứ 4', 'Tối Thứ 4',
        'Sáng Thứ 5', 'Chiều Thứ 5', 'Tối Thứ 5',
        'Sáng Thứ 6', 'Chiều Thứ 6', 'Tối Thứ 6',
        'Sáng Thứ 7', 'Chiều Thứ 7', 'Tối Thứ 7',
        'Sáng Chủ Nhật', 'Chiều Chủ Nhật', 'Tối Chủ Nhật',
    ];

    const Time = [
        '8:00 - 12:00 ',
        '13:00 - 17:00',
        '18:00 - 21:00',
    ];

    const [selectedTime, setSelectedTime] = useState([]);
    const [selectedDayOfWeekOnline, setSelectedDayOfWeekOnline] = useState([]);
    const [selectedDayOfWeekOffline, setSelectedDayOfWeekOffline] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [selectedClasses, setSelectedClasses] = useState([]);

    const handleTeachingModeChange = (event) => {
        setTeachingMode(event.target.value);
    };

    const handleCheckboxChange = (event, setState, state) => {
        const value = event.target.value;
        if (event.target.checked) {
            setState([...state, value]);
        } else {
            setState(state.filter(item => item !== value));
        }
    };

    const handleSubmit = () => {
        console.log('Hình thức dạy:', teachingMode);
        console.log('Thời gian dạy Online:', selectedTime);
        console.log('Ngày trong tuần của dạy Online:', selectedDayOfWeekOnline);
        console.log('Ngày trong tuần của dạy Offline:', selectedDayOfWeekOffline);
        console.log('Môn dạy:', selectedSubjects);
        console.log('Lớp dạy:', selectedClasses);
    };

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
                            <button className={styles.profileButtonRe}>
                                <a href="">XEM VIDEO HD</a>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="container mt-4" >
                    <div className={styles.profileTime} >
                        <div className='boxNameSubject mb-2' style={{ width: '20%', fontWeight: '600', paddingLeft: '30px' }}>Hình thức dạy:</div>
                        <div className={`form-check ${styles.subjectGrid}`}>
                            <select className="form-select" aria-label="Default select example" style={{ width: '135%' }} onChange={handleTeachingModeChange}>
                                <option value="">Chọn Hình Thức Dạy</option>
                                <option value="online">Dạy Online</option>
                                <option value="both">Dạy Online và Offline</option>
                            </select>
                        </div>
                    </div>
                    <hr style={{ width: '95%', marginLeft: '20px' }} />
                    <div className={styles.profileTime} >
                        <div className='boxNameSubject mb-2' style={{ width: '20%', fontWeight: '600', paddingLeft: '30px' }}>Thời gian dạy Online:</div>
                        <div className={`form-check ${styles.subjectGrid}`}>
                            {Time.map((name, index) => (
                                <div key={index} className="mb-4">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={`timeCheckbox${index}`}
                                        value={name}
                                        onChange={(event) => handleCheckboxChange(event, setSelectedTime, selectedTime)}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor={`timeCheckbox${index}`}
                                    >
                                        {name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr style={{ width: '95%', marginLeft: '20px' }} />
                    <div className={styles.profileDayOfWeek} >
                        <div className='boxNameSubject mb-2' style={{ width: '20%', fontWeight: '600', paddingLeft: '30px' }}>Ngày trong tuần của dạy Online:</div>
                        <div className={`form-check ${styles.subjectGrid}`}>
                            {DayOfWeekOnline.map((name, index) => (
                                <div key={index} className="mb-4">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={`dayOfWeekOnlineCheckbox${index}`}
                                        value={name}
                                        onChange={(event) => handleCheckboxChange(event, setSelectedDayOfWeekOnline, selectedDayOfWeekOnline)}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor={`dayOfWeekOnlineCheckbox${index}`}
                                    >
                                        {name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr style={{ width: '95%', marginLeft: '20px' }} />
                    {teachingMode === 'both' && (
                        <div className={styles.profileDayOfWeek}>
                            <div className='boxNameSubject mb-2' style={{ width: '20%', fontWeight: '600', paddingLeft: '30px' }}>Ngày trong tuần của dạy Offline:</div>
                            <div className={`form-check ${styles.subjectGrid}`}>
                                {DayOfWeekOffline.map((name, index) => (
                                    <div key={index} className="mb-4">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id={`dayOfWeekOfflineCheckbox${index}`}
                                            value={name}
                                            onChange={(event) => handleCheckboxChange(event, setSelectedDayOfWeekOffline, selectedDayOfWeekOffline)}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor={`dayOfWeekOfflineCheckbox${index}`}
                                        >
                                            {name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <hr style={{ width: '95%', marginLeft: '20px' }} />
                    <div className={styles.profileSubject}>
                        <div className='boxNameSubject mb-2' style={{ width: '20%', fontWeight: '600', paddingLeft: '30px' }}>
                            Môn dạy:
                        </div>
                        <div className={`form-check ${styles.subjectGrid}`}>
                            {Subject.map((name, index) => (
                                <div key={index} className="mb-4">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={`subjectCheckbox${index}`}
                                        value={name}
                                        onChange={(event) => handleCheckboxChange(event, setSelectedSubjects, selectedSubjects)}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor={`subjectCheckbox${index}`}
                                    >
                                        {name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr style={{ width: '95%', marginLeft: '20px' }} />
                    <div className={styles.profileClass} >
                        <div className='boxNameSubject mb-2' style={{ width: '20%', fontWeight: '600', paddingLeft: '30px' }}>Lớp dạy:</div>
                        <div className={`form-check ${styles.subjectGrid}`} >
                            {Class.map((name, index) => (
                                <div key={index} className="mb-4">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={`classCheckbox${index}`}
                                        value={name}
                                        onChange={(event) => handleCheckboxChange(event, setSelectedClasses, selectedClasses)}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor={`classCheckbox${index}`}
                                    >
                                        {name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr style={{ width: '95%', marginLeft: '20px' }} />
                    <button className={styles.buttonProfile} onClick={handleSubmit}>Cập nhật thông tin gia sư</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
