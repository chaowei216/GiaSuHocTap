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
    MDBTextArea,
} from 'mdb-react-ui-kit';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { UpdateNotification } from '../../../api/NotificationApi';
import WaitingModal from '../../global/WaitingModal';
import UpdateIcon from '@mui/icons-material/Update';
export default function UpdateModal(pros) {
    const { openDetail, setOpenDetail, isCreated, setIsCreated, dataDetail } = pros
    if (dataDetail == undefined) return <WaitingModal />
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});
    useEffect(() => {
        if (openDetail) {
            setDescription(dataDetail.description)
        }
    }, [dataDetail]);
    const handleSave = async () => {
        let flag = true;
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
            const notificationUpdate = {
                description: description
            }
            if (dataDetail.notificationId) {
                const response = await UpdateNotification(dataDetail?.notificationId, notificationUpdate)
                if (response.ok) {
                    const responseJson = await response.json();
                    if (responseJson.statusCode == 204) {
                        toast.success("Cập nhật thành công")
                        setIsCreated(!isCreated)
                        setOpenDetail(false)
                    } else {
                        toast.error(responseJson.message)
                    }
                } else {
                    toast.success("Lỗi server")
                }
            }
        }
    }
    return (
        <>
            <MDBModal tabIndex='-1' open={openDetail} onClose={() => setOpenDetail(false)}>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle className="text-xl" style={{ textAlign: "left", color: "#3295cf" }}>
                                <UpdateIcon color="primary" fontSize="large" sx={{ marginRight: "10px" }} /> Cập nhật thông báo
                            </MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={() => setOpenDetail(false)}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <div className="form-content">
                                <div style={{ fontSize: "larger", marginLeft: "5px", fontWeight: "bold" }}>
                                    Mô tả
                                </div>
                            </div>
                            <MDBTextArea
                                placeholder="Ghi chú thêm ..."
                                contrast
                                style={{ marginTop: "15px", marginBottom: "10px" }}
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
                            <Button color='error' onClick={() => setOpenDetail(false)}>
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