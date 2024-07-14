import { useEffect, useState } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBRow,
    MDBCol,
    MDBCardText,
    MDBTextArea,
} from 'mdb-react-ui-kit';
import styles from "../../partial/Profile/UserProfile.module.css";
import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { GetAllUser } from '../../../api/TutorManagementApi';
import SearchIcon from "@mui/icons-material/Search";
import { CreateNotification } from '../../../api/NotificationApi';
import useAuth from '../../../hooks/useAuth';
import { CreateModerator } from '../../../api/UserApi';

export default function CreateUser(pros) {
    const { centredModal, setCentredModal, isCreated, setIsCreated } = pros;
    const [userId, setUserId] = useState();
    const [errors, setErrors] = useState({});
    const { user } = useAuth();
    const [inputData, setInputData] = useState({
        email: '',
        fullname: '',
        phonenumber: '',
        dateofbirth: '',
        gender: '',
        address: '',
        city: '',
        district: ''
    });

    const handleSave = async () => {
        let flag = true;
        const newErrors = {};

        if (!inputData.fullname) {
            newErrors.fullname = "Vui lòng nhập tên";
            flag = false;
        }

        if (!inputData.email) {
            newErrors.email = "Vui lòng nhập email";
            flag = false;
        } else if (!/\S+@\S+\.\S+/.test(inputData.email)) {
            newErrors.email = "Email không hợp lệ.";
            flag = false;
        }

        if (!inputData.phonenumber) {
            newErrors.phonenumber = "Vui lòng nhập số điện thoại";
            flag = false;
        } else if (!/^\d{10}$/.test(inputData.phonenumber)) {
            newErrors.phonenumber = "Số điện thoại không hợp lệ.";
            flag = false;
        }

        if (!inputData.dateofbirth) {
            newErrors.dateofbirth = "Vui lòng nhập ngày sinh";
            flag = false;
        } else {
            const today = new Date();
            const dob = new Date(inputData.dateofbirth);
            if (dob >= today) {
                newErrors.dateofbirth = "Ngày sinh không hợp lệ.";
                flag = false;
            }
        }

        if (!inputData.gender) {
            newErrors.gender = "Vui lòng chọn giới tính.";
            flag = false;
        }

        if (!inputData.address) {
            newErrors.address = "Vui lòng nhập địa chỉ của bạn.";
            flag = false;
        }

        if (!inputData.city) {
            newErrors.city = "Vui lòng nhập thành phố của bạn.";
            flag = false;
        }

        if (!inputData.district) {
            newErrors.district = "Vui lòng nhập quận của bạn.";
            flag = false;
        }

        setErrors(newErrors);

        if (flag) {
            if (user) {
                const dataAdd = {
                    email: inputData.email,
                    fullname: inputData.fullname,
                    phonenumber: inputData.phonenumber,
                    dateofbirth: inputData.dateofbirth,
                    gender: inputData.gender,
                    address: inputData.address,
                    city: inputData.city,
                    district: inputData.district
                };
                const response = await CreateModerator(dataAdd);
                console.log(response);
                if (response.ok) {
                    const responseJson = await response.json();
                    if (responseJson.statusCode == 201) {
                        toast.success("Tạo tài khoản kiểm duyệt thành công");
                        setIsCreated(!isCreated);
                        setCentredModal(false);
                    } else {
                        toast.error("Coi lại số điện thoại và gmail");
                    }
                } else {
                    toast.error("Coi lại số điện thoại và gmail");
                }
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData({
            ...inputData,
            [name]: value
        });
        setErrors((prevState) => ({ ...prevState, [name]: '' })); // Clear error on change
    };

    return (
        <>
            <MDBModal tabIndex='-1' open={centredModal} onClose={() => setCentredModal(false)}>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle style={{ fontSize: "18px" }}>Tạo tài khoản người kiểm duyệt</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={() => setCentredModal(false)}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <MDBRow key={1} className={styles.profile_container} style={{ justifyContent: "space-between", marginBottom: "40px" }}>
                                <MDBCol sm="3" className={`${styles.profile} font-bold`}>
                                    <MDBCardText style={{ marginTop: "15px" }}>Tên: </MDBCardText>
                                </MDBCol>
                                <MDBCol sm="7" className={styles.profile}>
                                    <TextField
                                        value={inputData.fullname}
                                        onChange={handleChange}
                                        name='fullname'
                                        id="standard-basic"
                                        label="Tên"
                                        variant="standard"
                                        error={!!errors.fullname}
                                        helperText={errors.fullname}
                                    />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow key={2} className={styles.profile_container} style={{ justifyContent: "space-between", marginBottom: "40px" }}>
                                <MDBCol sm="3" className={`${styles.profile} font-bold`}>
                                    <MDBCardText style={{ marginTop: "15px" }}>Email: </MDBCardText>
                                </MDBCol>
                                <MDBCol sm="7" className={styles.profile}>
                                    <TextField
                                        value={inputData.email}
                                        name='email'
                                        onChange={handleChange}
                                        id="standard-basic"
                                        label="Email"
                                        variant="standard"
                                        error={!!errors.email}
                                        helperText={errors.email}
                                    />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow key={3} className={styles.profile_container} style={{ justifyContent: "space-between", marginBottom: "40px" }}>
                                <MDBCol sm="4" className={`${styles.profile} font-bold`}>
                                    <MDBCardText style={{ marginTop: "15px" }}>Số điện thoại: </MDBCardText>
                                </MDBCol>
                                <MDBCol sm="7" className={styles.profile}>
                                    <TextField
                                        value={inputData.phonenumber}
                                        name='phonenumber'
                                        onChange={handleChange}
                                        id="standard-basic"
                                        label="Số điện thoại"
                                        variant="standard"
                                        error={!!errors.phonenumber}
                                        helperText={errors.phonenumber}
                                    />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow key={4} className={styles.profile_container} style={{ justifyContent: "space-between", marginBottom: "40px" }}>
                                <MDBCol sm="4" className={`${styles.profile} font-bold`}>
                                    <MDBCardText style={{ marginTop: "15px" }}>Ngày sinh: </MDBCardText>
                                </MDBCol>
                                <MDBCol sm="7" className={styles.profile}>
                                    <TextField
                                        id="dob"
                                        style={{ width: "70%" }}
                                        name='dateofbirth'
                                        label="Ngày tháng năm sinh"
                                        variant="standard"
                                        margin="normal"
                                        type="date"
                                        value={inputData.dateofbirth}
                                        onChange={handleChange}
                                        error={!!errors.dateofbirth}
                                        helperText={errors.dateofbirth}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow key={5} className={styles.profile_container} style={{ justifyContent: "space-between", marginBottom: "40px" }}>
                                <MDBCol sm="4" className={`${styles.profile} font-bold`}>
                                    <MDBCardText style={{ marginTop: "15px" }}>Giới tính: </MDBCardText>
                                </MDBCol>
                                <MDBCol sm="7" className={styles.profile}>
                                    <FormControl style={{ width: "70%", marginTop: "7px" }} error={!!errors.gender}>
                                        <InputLabel variant='standard' id="demo-simple-select-helper-label">
                                            Giới tính
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="gender"
                                            value={inputData.gender}
                                            name="gender"
                                            label="Giới tính"
                                            variant='standard'
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="male">Nam</MenuItem>
                                            <MenuItem value="female">Nữ</MenuItem>
                                        </Select>
                                        {errors.gender && (<div className='mt-2 text-red-500' style={{fontSize: "12px"}}>{errors.gender}</div>)}
                                    </FormControl>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow key={6} className={styles.profile_container} style={{ justifyContent: "space-between", marginBottom: "40px" }}>
                                <MDBCol sm="4" className={`${styles.profile} font-bold`}>
                                    <MDBCardText style={{ marginTop: "15px" }}>Địa chỉ: </MDBCardText>
                                </MDBCol>
                                <MDBCol sm="7" className={styles.profile}>
                                    <TextField
                                        value={inputData.address}
                                        name='address'
                                        onChange={handleChange}
                                        id="standard-basic"
                                        label="Địa chỉ"
                                        variant="standard"
                                        error={!!errors.address}
                                        helperText={errors.address}
                                    />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow key={7} className={styles.profile_container} style={{ justifyContent: "space-between", marginBottom: "40px" }}>
                                <MDBCol sm="4" className={`${styles.profile} font-bold`}>
                                    <MDBCardText style={{ marginTop: "15px" }}>Thành phố: </MDBCardText>
                                </MDBCol>
                                <MDBCol sm="7" className={styles.profile}>
                                    <TextField
                                        value={inputData.city}
                                        name='city'
                                        onChange={handleChange}
                                        id="standard-basic"
                                        label="Thành phố"
                                        variant="standard"
                                        error={!!errors.city}
                                        helperText={errors.city}
                                    />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow key={8} className={styles.profile_container} style={{ justifyContent: "space-between", marginBottom: "40px" }}>
                                <MDBCol sm="4" className={`${styles.profile} font-bold`}>
                                    <MDBCardText style={{ marginTop: "15px" }}>Quận: </MDBCardText>
                                </MDBCol>
                                <MDBCol sm="7" className={styles.profile}>
                                    <TextField
                                        value={inputData.district}
                                        name='district'
                                        onChange={handleChange}
                                        id="standard-basic"
                                        label="Quận"
                                        variant="standard"
                                        error={!!errors.district}
                                        helperText={errors.district}
                                    />
                                </MDBCol>
                            </MDBRow>
                        </MDBModalBody>
                        <MDBModalFooter style={{ gap: "15px" }}>
                            <Button variant='contained' color='error' onClick={() => setCentredModal(false)}>
                                Đóng
                            </Button>
                            <Button variant='contained' onClick={handleSave}>Lưu</Button>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}
