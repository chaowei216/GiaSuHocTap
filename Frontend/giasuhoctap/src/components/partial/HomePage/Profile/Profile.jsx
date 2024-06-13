import React from 'react';
import styles from './Profile.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const Profile = () => {
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

    const Time = [
        'Sáng Thứ 2', 'Chiều Thứ 2', 'Tối Thứ 2',
        'Sáng Thứ 3', 'Chiều Thứ 3', 'Tối Thứ 3',
        'Sáng Thứ 4', 'Chiều Thứ 4', 'Tối Thứ 4',
        'Sáng Thứ 5', 'Chiều Thứ 5', 'Tối Thứ 5',
        'Sáng Thứ 6', 'Chiều Thứ 6', 'Tối Thứ 6',
        'Sáng Thứ 7', 'Chiều Thứ 7', 'Tối Thứ 7',
        'Sáng Chủ Nhật', 'Chiều Chủ Nhật', 'Tối Chủ Nhật',
    ];

    return (
        <div className={`profileBox ${styles.profileBox}`} style={{ width: '100%', height: '100%', backgroundColor: '#F0F9FC' }}>
            <div className={styles.profileBody} style={{backgroundColor: 'white'}}>
                <div className='container mr-4' style={{borderBottom: '1px solid #679312', paddingBottom: '10px', paddingTop: '10px', width: '95%'}}>
                    <div className={styles.profileReTutor}>
                        <div className={styles.profileBgTu}>
                            <h1>ĐĂNG KÝ LÀM GIA SƯ</h1>
                        </div>
                        <div>
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
                    <div className="mb-3" style={{ display: 'flex' }}>
                        <label htmlFor="name" className="form-label" style={{ width: '20%' }}>Nghề nghiệp:</label>
                        <input type="text" className="form-control" id="name" name="name" style={{ width: '60%', marginLeft: '120px' }} />
                    </div>
                    <div className="mb-3" style={{ display: 'flex' }}>
                        <label htmlFor="bio" className="form-label" style={{ width: '20%' }}>Mô tả:</label>
                        <textarea className="form-control" style={{ width: '60%', marginLeft: '120px' }} id="bio" name="bio" rows="3"></textarea>
                    </div>
                    <div className={styles.profileSubject}>
                        <div className='boxNameSubject mb-2' style={{width: '15%'}}>
                            Môn dạy:
                        </div>
                        <div className={`form-check ${styles.subjectGrid}`}>
                            {Subject.map((name, index) => (
                                <div key={index} className="mb-2">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={`checkbox${index}`}
                                        name={`checkbox${index}`}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor={`checkbox${index}`}
                                    >
                                        {name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr style={{ width: '95%', marginLeft: '20px' }} />
                    <div className={styles.profileClass} >
                        <div className='boxNameSubject mb-2' style={{width: '15%'}}>Lớp dạy:</div>
                        <div className={`form-check ${styles.subjectGrid}`} >
                            {Class.map((name, index) => (
                                <div key={index} className="mb-2">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={`checkbox${index}`}
                                        name={`checkbox${index}`}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor={`checkbox${index}`}
                                    >
                                        {name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr style={{ width: '95%', marginLeft: '20px' }} />
                    <div className={styles.profileTime} >
                        <div className='boxNameSubject mb-2' style={{width: '15%'}}>Thời gian dạy:</div>
                        <div className={`form-check ${styles.subjectGrid}`}>
                            {Time.map((name, index) => (
                                <div key={index} className="mb-2">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={`checkbox${index}`}
                                        name={`checkbox${index}`}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor={`checkbox${index}`}
                                    >
                                        {name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr style={{ width: '95%', marginLeft: '20px' }} />
                    <button className={styles.buttonProfile}>Đăng Ký</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
