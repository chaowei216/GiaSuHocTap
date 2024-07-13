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
import styles from "../../partial/Profile/UserProfile.module.css"
import { Autocomplete, Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { GetAllUser } from '../../../api/TutorManagementApi';
import SearchIcon from "@mui/icons-material/Search";
import { CreateNotification } from '../../../api/NotificationApi';
import useAuth from '../../../hooks/useAuth';

export default function CreateUser(pros) {
    const { centredModal, setCentredModal, isCreated, setIsCreated } = pros
    const [listUser, setListUser] = useState([])
    const [userId, setUserId] = useState();
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});
    const { user } = useAuth()
    const [inputData, setInputData] = useState({
        name: '',
    });
    useEffect(() => {
        const getAllUser = async () => {
            const response = await GetAllUser();
            if (response.ok) {
                const responseJson = await response.json();
                const data = responseJson.data.data;
                setListUser(data);
            } else {
                toast.error("Error getting user")
            }
        }
        getAllUser();
    }, [])
    const handleSave = async () => {
        let flag = true;
        console.log(userId);
        if (description == "") {
            setErrors((prevState) => {
                return {
                    ...prevState,
                    descriptione: "Vui lòng nhập mô tả",
                };
            });
            flag = false;
        }
        if (flag) {
            if (user) {
                const notification = {
                    userId: user?.userId,
                    description: description
                }
                const response = await CreateNotification(notification)
                if (response.ok) {
                    const responseJson = await response.json();
                    if (responseJson.statusCode == 200) {
                        toast.success("Created notification successfully")
                        setIsCreated(!isCreated)
                        setCentredModal(false)
                    } else {
                        toast.error(responseJson.message)
                    }
                } else {
                    toast.success("Fail to create notification")
                }
            }
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData({
            ...inputData,
            [name]: value
        });
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
                            <MDBRow key={1} className={styles.profile_container} style={{ justifyContent: "space-between", marginBottom: "20px" }}>
                                <MDBCol sm="3" className={`${styles.profile} font-bold`}>
                                    <MDBCardText style={{ marginTop: "15px" }}>Tên: </MDBCardText>
                                </MDBCol>
                                <MDBCol sm="7" className={styles.profile}>
                                    <TextField value={inputData.name} onChange={handleChange} name='name' id="standard-basic" label="Tên" variant="standard" />
                                </MDBCol>
                            </MDBRow>
                            {errors.user && (<div className='mt-2 text-red-500'>{errors.user}</div>)}
                            <MDBRow key={2} className={styles.profile_container} style={{ justifyContent: "space-between", marginBottom: "20px" }}>
                                <MDBCol sm="3" className={`${styles.profile} font-bold`}>
                                    <MDBCardText style={{ marginTop: "15px" }}>Email: </MDBCardText>
                                </MDBCol>
                                <MDBCol sm="7" className={styles.profile}>
                                    <TextField onChange={handleChange} id="standard-basic" label="Email" variant="standard" />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow key={3} className={styles.profile_container} style={{ justifyContent: "space-between", marginBottom: "20px" }}>
                                <MDBCol sm="3" className={`${styles.profile} font-bold`}>
                                    <MDBCardText style={{ marginTop: "15px" }}>Mật khẩu: </MDBCardText>
                                </MDBCol>
                                <MDBCol sm="7" className={styles.profile}>
                                    <TextField onChange={handleChange} id="standard-basic" label="Mật khẩu" variant="standard" />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow key={4} className={styles.profile_container} style={{ justifyContent: "space-between", marginBottom: "20px" }}>
                                <MDBCol sm="4" className={`${styles.profile} font-bold`}>
                                    <MDBCardText style={{ marginTop: "15px" }}>Số điện thoại: </MDBCardText>
                                </MDBCol>
                                <MDBCol sm="7" className={styles.profile}>
                                    <TextField onChange={handleChange} id="standard-basic" label="Số điện thoại" variant="standard" />
                                </MDBCol>
                            </MDBRow>
                            {errors.descriptione && (<div className='mt-2 text-red-500'>{errors.descriptione}</div>)}
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