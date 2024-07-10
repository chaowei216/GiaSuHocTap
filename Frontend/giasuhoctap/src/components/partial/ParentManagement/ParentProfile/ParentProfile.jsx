import React, { useRef, useState } from 'react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import styles from './ParentProfile.module.css';
import logo from '../../../../../public/img/logoGiasu2.png';
import { validationSchema } from './ValidationParentProfile';
import useAuth from '../../../../hooks/useAuth';
import { UpdateUser } from '../../../../api/ParentManagement';
import { toast } from 'react-toastify';
import InputFileUpload from "../../../global/UploadFile";

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
    const [selectedImage, setSelectedImage] = useState(null);
    const { user } = useAuth();

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event, setFieldValue) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result); // Lưu base64 string vào state selectedImage để hiển thị hình ảnh
            };
            reader.readAsDataURL(file);
            setFieldValue('image', file.name); // Bạn có thể comment hoặc xóa dòng này vì không cần thiết nếu chỉ muốn hiển thị hình ảnh
        }
    };
    const handleSubmit = async (values, { setSubmitting }) => {
        // Use selectedImage (base64 string) for the image field
        const formData = {
            ...values,
            image: selectedImage || '', // Ensure image is a string
        };

        console.log('Form data:', formData); // Log form data
        
        try {
            const response = await UpdateUser(user?.userId, formData);
            if (response.ok) {
                toast.success('Cập nhật thành công');
            } else {
                toast.error('Có lỗi xảy ra khi cập nhật');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Có lỗi xảy ra khi cập nhật');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={{
                city: '',
                district: '',
                address: '',
                gender: '',
                image: null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ setFieldValue, isSubmitting }) => (
                <FormikForm>
                    <div className='container'>
                        <div className={styles.profileBody} style={{ marginLeft: '20px', marginTop: '25px' }}>
                            <div className={styles.profile}>
                                <h1>Thông tin cá nhân</h1>
                            </div>
                            <div className={styles.cropimgAvatar}>
                                <img src={selectedImage || logo} alt="avatar" className={styles.brand} />
                                <button type="button" onClick={handleButtonClick} style={{ marginLeft: '20px' }}>
                                    <span style={{ color: '#4dccda', fontWeight: 'bold' }}>
                                        Thay đổi
                                        <p style={{ color: 'rgb(144, 149, 156)', fontWeight: '300' }}>JPG, GIF hoặc PNG, tối đa 5 MB.</p>
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
                            <div className={styles.profileBox}>
                                <div className={styles.notify}>
                                    <label className={styles.label}>QUẬN/HUYỆN</label>
                                    <ErrorMessage name="district" component="div" className={styles.error} />
                                </div>
                                <Field type="text" name="district" placeholder="Nhập quận/huyện" className={styles.input} />
                            </div>
                            <div className={styles.profileBoxNIput}>
                                <div className={styles.notify}>
                                    <label>ĐỊA CHỈ CỤ THỂ</label>
                                    <ErrorMessage name="address" component="div" className={styles.error} />
                                </div>
                                <Field type="text" name="address" placeholder="Nhập địa chỉ cụ thể" className={styles.input} />
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
