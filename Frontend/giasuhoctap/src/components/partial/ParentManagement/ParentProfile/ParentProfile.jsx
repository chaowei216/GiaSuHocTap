import React, { useState } from 'react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import styles from './ParentProfile.module.css';
import logo from '../../../../../public/img/logoGiasu2.png';
import { validationSchema } from './ValidationParentProfile';
import useAuth from '../../../../hooks/useAuth';
import { UpdateUser } from '../../../../api/ParentManagement';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

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
    const { user } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (values) => {
        try {
            const response = await UpdateUser(user?.userId, values);
            if (response.ok) {
                toast.success('Cập nhật thành công');
            } else {
                toast.error('Có lỗi xảy ra khi cập nhật');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Có lỗi xảy ra khi cập nhật');
        }
    };

    return (
        <Formik
            initialValues={{
                city: user?.city || '',
                district: user?.district || '',
                address: user?.address || '',
                gender: user?.gender || '',
                password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <FormikForm>
                <div className='container'>
                    <div className={styles.profileBody} style={{ marginLeft: '20px', marginTop: '25px' }}>
                        <div className={styles.profile}>
                            <h1>Thông tin cá nhân</h1>
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
                        <div className={styles.profileBoxNIput}>
                            <div className={styles.notify}>
                                <label htmlFor="password">MẬT KHẨU</label>
                                <ErrorMessage name="password" component="div" className={styles.error} />
                            </div>
                            <div className={styles.passwordInputContainer}>
                                <Field type={showPassword ? "text" : "password"} name="password" placeholder="Nhập mật khẩu" className={styles.input} />
                                <FontAwesomeIcon
                                    icon={showPassword ? faEyeSlash : faEye}
                                    className={styles.passwordIcon}
                                    onClick={() => setShowPassword(!showPassword)}
                                />
                            </div>
                        </div>
                    </div>

                    <hr style={{ width: '40%', margin: '20px 0 20px 20px' }} />
                    <button type="submit" className={styles.profileButton}>
                        Cập nhật
                    </button>
                </div>
            </FormikForm>
        </Formik>
    );
};

export default ParentProfile;
