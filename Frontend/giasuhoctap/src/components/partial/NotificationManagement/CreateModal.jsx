import React, { useEffect, useState } from 'react';
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

export default function CreateModal(pros) {
    const { centredModal, setCentredModal, isCreated, setIsCreated } = pros
    const [listUser, setListUser] = useState([])
    const [userId, setUserId] = useState();
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});
    const { user } = useAuth()
    useEffect(() => {
        const getAllUser = async () => {
            const response = await GetAllUser();
            if (response.ok) {
                const responseJson = await response.json();
                const data = responseJson.data.data;
                setListUser(data);
            } else {
                toast.error("Lỗi sever")
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
                        toast.success("Tạo thông báo thành công")
                        setIsCreated(!isCreated)
                        setCentredModal(false)
                    } else {
                        toast.error(responseJson.message)
                    }
                } else {
                    toast.success("Lỗi sever")
                }
            }
        }
    }
    return (
        <>

            <MDBModal tabIndex='-1' open={centredModal} onClose={() => setCentredModal(false)}>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Tạo thông báo mới</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={() => setCentredModal(false)}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <MDBRow key={1} className={styles.profile_container} style={{ justifyContent: "space-between", marginBottom: "10px" }}>
                                <MDBCol sm="3" className={`${styles.profile} font-bold`}>
                                    <MDBCardText>Moderator: </MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9" className={styles.profile}>
                                    <MDBCardText>{user?.fullname}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <MDBCol sm="3" className={`${styles.profile} font-bold`}>
                                <MDBCardText>Ghi chú</MDBCardText>
                            </MDBCol>
                            {errors.user && (<div className='mt-2 text-red-500'>{errors.user}</div>)}
                            <MDBTextArea
                                placeholder="Ghi chú thêm ..."
                                contrast
                                style={{ marginTop: "25px", marginBottom: "10px" }}
                                id="textAreaExample"
                                rows={3}
                                name="description"
                                value={description}
                                onChange={(event) => {
                                    setDescription(event.target.value)
                                    setErrors((prevState) => {
                                        return {
                                            ...prevState,
                                            descriptione: null,
                                        };
                                    });
                                }}
                            />
                            {errors.descriptione && (<div className='mt-2 text-red-500'>{errors.descriptione}</div>)}
                        </MDBModalBody>
                        <MDBModalFooter>
                            <Button color='error' onClick={() => setCentredModal(false)}>
                                Close
                            </Button>
                            <Button onClick={handleSave}>Save changes</Button>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}