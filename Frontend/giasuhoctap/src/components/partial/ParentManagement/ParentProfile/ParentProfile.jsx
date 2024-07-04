import React, { useRef, useState } from 'react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import css
import styles from './ParentProfile.module.css';
import logo from '../../../../../public/img/logoGiasu2.png';
import { validationSchema } from './ValidationParentProfile';
import * as Yup from 'yup'; // Import Yup for validation

const countries = [
    "Vietnam"
];

const cities = [
    "An Giang","Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước",
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

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event, setFieldValue) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
            setFieldValue('image', file); // Set image field in Formik
        }
    };

    const formatDate = (date) => {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('/');
    };

    const removeFileMetadata = (file) => {
        return {
            name: file.name,
            size: file.size,
            type: file.type
        };
    };

    return (
        <Formik
            initialValues={{
                fullName: '',
                nickname: '',
                birthdate: null,
                language: '',
                country: '',
                city: '',
                gender: '',
                image: null, // Add image field
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                const formattedValues = {
                    ...values,
                    birthdate: values.birthdate ? formatDate(values.birthdate) : null,
                    image: values.image ? removeFileMetadata(values.image) : null
                };
                console.log(formattedValues);
                setSubmitting(false);
            }}
        >
            {({ setFieldValue, values, isSubmitting }) => (
                <FormikForm>
                    <div className='container'>
                        <div className={styles.profileBody} style={{ marginLeft: '20px', marginTop: '25px' }}>
                            <div className={styles.profile}>
                                <h1>Thông tin cá nhân</h1>
                            </div>
                            <div className={styles.cropimgAvatar}>
                                <img src={selectedImage} alt="logo" className={styles.brand} />
                                <button type="button" onClick={handleButtonClick} style={{ marginLeft: '20px' }}>
                                    <span style={{ color: '#4dccda', fontWeight: 'bold' }}>
                                        Thay đổi
                                        <p style={{ color: 'rgb(144, 149, 156)', fontWeight: '300' }}>JPG, GIF or PNG, max 5 MB.</p>
                                    </span>
                                </button>
                                <ErrorMessage name="image" component="div" className={styles.errorImg} />
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    accept="image/png, image/jpeg, image/gif"
                                    onChange={(event) => handleFileChange(event, setFieldValue)}
                                />
                            </div>
                            <div className={styles.profileBox}>
                                <div className={styles.notify}>
                                    <label className={styles.label}>HỌ VÀ TÊN</label>
                                    <ErrorMessage name="fullName" component="div" className={styles.error} />
                                </div>
                                <Field type="text" name="fullName" placeholder="Nhập họ và tên" className={styles.input} />
                            </div>
                            <div className={styles.profileBox}>
                                <div className={styles.notify}>
                                    <label className={styles.label}>BIỆT DANH</label>
                                    <ErrorMessage name="nickname" component="div" className={styles.error} />
                                </div>
                                <Field type="text" name="nickname" placeholder="Nhập biệt danh" className={styles.input} />
                            </div>
                            <div className={styles.profileBoxNIput} style={{ display: 'flex', flexDirection: 'column' }}>
                                <div className={styles.notify}>
                                    <label>NGÀY SINH</label>
                                    <ErrorMessage name="birthdate" component="div" className={styles.error} />
                                </div>
                                <DatePicker
                                    selected={values.birthdate}
                                    onChange={(date) => setFieldValue('birthdate', date)}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Chọn ngày sinh"
                                    className="customDatePicker"
                                    showTimeInput={false} // Disable time input
                                />
                            </div>
                            <div className={styles.profileBoxNIput}>
                                <div className={styles.notify}>
                                    <label>NGÔN NGỮ</label>
                                    <ErrorMessage name="language" component="div" className={styles.error} />
                                </div>
                                <Field as="select" name="language" className={styles.input}>
                                    <option value="" disabled>
                                        --- Chọn ngôn ngữ ---
                                    </option>
                                    <option value="vietnamese">Tiếng Việt</option>
                                </Field>
                            </div>
                            <div className={styles.profileBoxNIput}>
                                <div className={styles.notify}>
                                    <label>QUỐC GIA</label>
                                    <ErrorMessage name="country" component="div" className={styles.error} />
                                </div>
                                <Field as="select" name="country" className={styles.input}>
                                    <option value="" disabled>
                                        --- Chọn quốc gia ---
                                    </option>
                                    {countries.map((country, index) => (
                                        <option key={index} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </Field>
                            </div>
                            <div className={styles.profileBoxNIput}>
                                <div className={styles.notify}>
                                    <label>THÀNH PHỐ</label>
                                    <ErrorMessage name="city" component="div" className={styles.error} />
                                </div>
                                <Field as="select" name="city" className={styles.input}>
                                    <option value="" disabled>
                                        --- Chọn thành phố ---
                                    </option>
                                    {cities.map((city, index) => (
                                        <option key={index} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </Field>
                            </div>
                            <div className={styles.profileBoxNIput}>
                                <div className={styles.notify}>
                                    <label style={{ color: '#90959c', marginBottom: '10px' }}>GIỚI TÍNH</label>
                                    <ErrorMessage name="gender" component="div" className={styles.error} />
                                </div>
                                <div className={styles.profileCheckbox} style={{ display: 'flex' }}>
                                    <div style={{ marginLeft: '20px' }}>
                                        <Field type="radio" name="gender" value="male" className={styles.radio} />
                                        <label htmlFor="male" style={{ marginLeft: '10px', fontSize: '16px' }}>Nam</label>
                                    </div>
                                    <div style={{ marginLeft: '50px' }}>
                                        <Field type="radio" name="gender" value="female" className={styles.radio} />
                                        <label htmlFor="female" style={{ marginLeft: '10px', fontSize: '16px' }}>Nữ</label>
                                    </div>
                                </div>
                            </div>
                            <hr style={{ width: '40%', margin: '20px 0 20px 0' }} />
                        </div>
                        <button type="submit" className={styles.profileButton} disabled={isSubmitting}>
                            Cập nhật
                        </button>
                    </div>
                </FormikForm>
            )}
        </Formik>
    );
};

export default ParentProfile;
