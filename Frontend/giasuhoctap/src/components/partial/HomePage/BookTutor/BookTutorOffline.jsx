import styles from './BookTutor.module.css';

const tutors = [
    {
        name: "David Dell",
        imgSrc: "../../../../../public/img/Carousel1.jpg",
        description: "The Lorem ipsum, dolor sit amet consectetur adipisici.",
        subject: 'Toán, Lý, Hóa',
        wage: '100.000VND',
        teachingForm: 'Offline',
        dayOfWeek: 'Thứ 2, Thứ 3, Thứ 4, Thứ 5',
        class: 'Lớp 7, Lớp 8, Lớp 9, Lớp 10',
    },
    {
        name: "Jane Doe",
        imgSrc: "../../../../../public/img/Carousel2.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing el.",
        subject: 'Lý, Toán, Văn',
        wage: '100.000VND',
        teachingForm: 'Offline',
        dayOfWeek: 'Thứ 2, Thứ 3, Thứ 4, Thứ 5',
        class: 'Lớp 7, Lớp 8, Lớp 9, Lớp 10',
    },
    {
        name: "John Smith",
        imgSrc: "../../../../../public/img/Carousel3.jpg",
        description: "Sed nisi. Nulla quis sem at nibh elementum imperdi.",
        subject: 'Hóa, Toán, Văn',
        wage: '100.000VND',
        teachingForm: 'Online',
        dayOfWeek: 'Thứ 2, Thứ 3, Thứ 4, Thứ 5',
        class: 'Lớp 7, Lớp 8, Lớp 9, Lớp 10',
    },
    {
        name: "Emily Johnson",
        imgSrc: "../../../../../public/img/Carousel2.jpg",
        description: "Mauris massa. Vestibulum lacinia arcu eget nulla.",
        subject: 'Anh, Hóa, Toán, Văn',
        wage: '100.000VND',
        teachingForm: 'Online',
        dayOfWeek: 'Thứ 2, Thứ 3, Thứ 4, Thứ 5',
        class: 'Lớp 7, Lớp 8, Lớp 9, Lớp 10',
    },
    {
        name: "Michael Brown",
        imgSrc: "../../../../../public/img/Carousel1.jpg",
        description: "Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam.",
        subject: 'Văn, Hóa, Toán, Văn',
        wage: '100.000VND',
        teachingForm: 'Online',
        dayOfWeek: 'Thứ 2, Thứ 3, Thứ 4, Thứ 5',
        class: 'Lớp 7, Lớp 8, Lớp 9, Lớp 10',
    },
    {
        name: "Michael Brown",
        imgSrc: "../../../../../public/img/Carousel1.jpg",
        description: "Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam.",
        subject: 'Văn, Hóa, Toán, Văn',
        wage: '100.000VND',
        teachingForm: 'Online',
        dayOfWeek: 'Thứ 2, Thứ 3, Thứ 4, Thứ 5',
        class: 'Lớp 7, Lớp 8, Lớp 9, Lớp 10',
    }
];

const BookTutorOffline = () => {
    return (
        <div className={styles.slideBox} style={{ width: '100%', height: '100%' }}>
            <div className={styles.slideReTutor}>
                <div className={styles.slideBgTu}>
                    <h1>DANH SÁCH GIA SƯ OFFLINE</h1>
                </div>
                <div className={`slide-container ${styles.slideContainer}`}>
                    <div className={`slide-content ${styles.slideContent}`}>
                        <div className={`card-wrapper ${styles.cardWrapper}`}>
                            {tutors.map((tutor, index) => (
                                <div key={index} className={`card ${styles.card}`}>
                                    <div className={`image-content ${styles.imageContent}`}>
                                        <span className={`overlay ${styles.overlay}`}></span>
                                        <div className={`card-image ${styles.cardImage}`}>
                                            <img src={tutor.imgSrc} className={`card-img ${styles.cardImg}`} alt={tutor.name} />
                                        </div>
                                    </div>
                                    <div className={`card-content ${styles.cardContent}`}>
                                        <h2 className={`name ${styles.name}`}>{tutor.name}</h2>
                                        <div className={styles.cardSubject}>
                                            <p className={styles.cardTitle}>Môn dạy: </p>
                                            <p className={`class ${styles.subject}`}>{tutor.subject}</p>
                                        </div>
                                        <div className={styles.cardSubject}>
                                            <p className={styles.cardTitle}>Lớp dạy: </p>
                                            <p className={`class ${styles.class}`}>{tutor.class}</p>
                                        </div>
                                        <div className={styles.cardSubject}>
                                            <p className={styles.cardTitle}>Tiền lương: </p>
                                            <p className={`wage ${styles.wage}`}>{tutor.wage}</p>
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
    );
};

export default BookTutorOffline;
