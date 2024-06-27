import React, { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import css
import styles from './ParentProfile.module.css';
import logo from '../../../../../public/img/logoGiasu2.png';

// List of countries
const countries = [
    "Vietnam", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
    "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
    "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic of the", "Congo, Republic of the",
    "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor",
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland",
    "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
    "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq",
    "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North",
    "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya",
    "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
    "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique",
    "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia",
    "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines",
    "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa",
    "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
    "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
    "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
    "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu",
    "Vatican City", "Venezuela", "Yemen", "Zambia", "Zimbabwe"
];

// List of provinces and cities
const cities = [
    "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước",
    "Bình Thuận", "Cà Mau", "Cần Thơ", "Cao Bằng", "Đà Nẵng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp",
    "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh", "Hải Dương", "Hải Phòng", "Hậu Giang", "Hòa Bình", "Hưng Yên",
    "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An",
    "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng",
    "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "TP Hồ Chí Minh", "Trà Vinh", "Tuyên Quang",
    "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
];

const ParentProfile = () => {
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(logo);
    const [birthdate, setBirthdate] = useState(null); // State to store selected birthdate

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDateChange = (date) => {
        setBirthdate(date);
    };

    return (
        <div className='container'>
            <div className={styles.profileBody} style={{ marginLeft: '20px', marginTop: '25px' }}>
                <div className={styles.profile}>
                    <h1>Thông tin cá nhân</h1>
                </div>
                <div className={styles.cropimgAvatar}>
                    <img src={selectedImage} alt="logo" className={styles.brand} />
                    <button onClick={handleButtonClick} style={{ marginLeft: '20px' }}>
                        <span style={{ color: '#4dccda', fontWeight: 'bold' }}>
                            Thay đổi
                            <p style={{ color: 'rgb(144, 149, 156)', fontWeight: '300' }}>JPG, GIF or PNG, max 5 MB. </p>
                        </span>
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        accept="image/png, image/jpeg, image/gif"
                        onChange={handleFileChange}
                    />
                </div>
                <div className={styles.profileBox}>
                    <label style={{
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        fontFamily: 'Poppins',
                        fontSize: '14px',
                        color: '#90959c',
                    }}> HỌ VÀ TÊN</label>
                    <Form.Control type="text" placeholder="Nhập họ và tên" style={{ width: '40%', height: '40px' }} />
                </div>
                <div className={styles.profileBox}>
                    <label style={{
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        fontFamily: 'Poppins',
                        fontSize: '14px',
                        color: '#90959c',
                    }}> BIỆT DANH</label>
                    <Form.Control type="text" placeholder="Nhập biệt danh" style={{ width: '40%', height: '40px' }} />
                </div>
                <div className={styles.profileBoxNIput} style={{display: 'flex', flexDirection: 'column'}}>
                    <label> NGÀY SINH</label>
                    <DatePicker
                        selected={birthdate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Chọn ngày sinh"
                        className="customDatePicker" 
                    />
                </div>
                <div className={styles.profileBoxNIput}>
                    <label> NGÔN NGỮ</label>
                    <Form.Select style={{ width: '40%', height: '40px' }}>
                        <option disabled>--- Chọn ngôn ngữ ---</option>
                        <option value="vietnamese">Tiếng Việt</option>
                    </Form.Select>
                </div>
                <div className={styles.profileBoxNIput}>
                    <label> QUỐC GIA</label>
                    <Form.Select style={{ width: '40%', height: '40px' }}>
                        <option disabled>--- Chọn quốc gia ---</option>
                        {countries.map((country, index) => (
                            <option key={index} value={country}>{country}</option>
                        ))}
                    </Form.Select>
                </div>
                <div className={styles.profileBoxNIput}>
                    <label> THÀNH PHỐ</label>
                    <Form.Select style={{ width: '40%', height: '40px' }}>
                        <option disabled>--- Chọn thành phố ---</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city}>{city}</option>
                        ))}
                    </Form.Select>
                </div>
                <div className={styles.profileBoxNIput}>
                    <label style={{ color: '#90959c', marginBottom: '10px' }}> GIỚI TÍNH</label>
                    <div className={styles.profileCheckbox} style={{ display: 'flex' }}>
                        <div style={{ marginLeft: '20px' }}>
                            <input
                                type="radio"
                                name="gender"
                                id="male"
                                style={{ width: '20px', height: '20px', accentColor: 'rgb(29 158 173)' }}
                            />
                            <label htmlFor="male" style={{ marginLeft: '10px', fontSize: '16px' }}>Nam</label>
                        </div>
                        <div style={{ marginLeft: '50px' }}>
                            <input
                                type="radio"
                                name="gender"
                                id="female"
                                style={{ width: '20px', height: '20px', accentColor: 'rgb(29 158 173)' }}
                            />
                            <label htmlFor="female" style={{ marginLeft: '10px', fontSize: '16px' }}>Nữ</label>
                        </div>
                    </div>
                </div>
                <hr style={{ width: '40%', margin: '20px 0 20px 0' }} />
            </div>
            <button className={styles.profileButton} >Cập nhật</button>
        </div>
    );
};

export default ParentProfile;
