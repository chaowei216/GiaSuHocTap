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
import { useEffect, useState } from 'react';
import BookingTimePicker from './BookingTimePicker';
export default function UpdateTimeTable(pros) {
    const { openDetail, setOpenDetail, isCreated, setIsCreated, dataDetail, email } = pros
    if (dataDetail == undefined) return <WaitingModal />
    return (
        <>
            <MDBModal tabIndex='-1' open={openDetail} onClose={() => setOpenDetail(false)}>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle className="text-xl" style={{ textAlign: "left", color: "#3295cf" }}>
                                <UpdateIcon color="primary" fontSize="large" sx={{ marginRight: "10px" }} /> Cập nhật giờ học
                            </MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={() => setOpenDetail(false)}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <BookingTimePicker isCreated={isCreated} setIsCreated={setIsCreated} dataDetail={dataDetail} email={email} setOpenDetail={setOpenDetail} />
                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}