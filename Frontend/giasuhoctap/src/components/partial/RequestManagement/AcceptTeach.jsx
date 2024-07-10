import { useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBCardText,
} from 'mdb-react-ui-kit';
import { Button, TextField } from '@mui/material';
import styles from "../../partial/Profile/UserProfile.module.css"
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import { AcceptOrDenyRequestOnline } from '../../../api/RequestApi';

export default function AcceptTeach({ basicModal, setBasicModal, data, setIsUpdated, isUpdated }) {
  const { user } = useAuth()
  const [meetUrl, setMeetUrl] = useState("");
  const handleAccept = async () => {
    if (user && data) {
      const dataUpdate = {
        tutorId: user?.userId,
        requestId: data?.requestId,
        isAccepted: true,
        linkMeet: meetUrl
      }
      const response = await AcceptOrDenyRequestOnline(dataUpdate)
      if (response.ok) {
        const responseJson = await response.json();
        if (responseJson.statusCode == 200) {
          setIsUpdated(!isUpdated)
          toast.success("Chấp nhận thành công")
        }
      } else {
        toast.error("Lỗi sever")
      }
      console.log(dataUpdate)
    }
  }
  return (
    <>
      <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex='-1'>
        <MDBModalDialog size='lg'>
          <MDBModalContent>
            <MDBModalHeader className='justify-center'>
              <MDBModalTitle className='text-xl font-bold'>Điền thông tin để chấp nhận</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBCard className="mb-4" style={{ border: "none" }}>
                <MDBCardBody>
                  <MDBRow className={styles.profile_container} style={{ justifyContent: "space-between" }}>
                    <MDBCol sm="3" className={`${styles.profile} font-bold`}>
                      <MDBCardText>Tên người yêu cầu: </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="5" className={styles.profile}>
                      <MDBCardText className="text-muted font-bold">{data?.requestUserName}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className={styles.profile_container} style={{ justifyContent: "space-between" }}>
                    <MDBCol sm="3" className={`${styles.profile} font-bold`}>
                      <MDBCardText>Môn học</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="5" className={styles.profile}>
                      <MDBCardText className="text-muted font-bold">
                        <span>{data?.courseName}</span>
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className={styles.profile_container} style={{ justifyContent: "space-between" }}>
                    <MDBCol sm="3" className={`${styles.profile} font-bold`}>
                      <MDBCardText>Lớp học</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="5" className={styles.profile}>
                      <MDBCardText className="text-muted font-bold">
                        <span>{data?.className}</span>
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className={styles.profile_container} style={{ justifyContent: "space-between" }}>
                    <MDBCol sm="3" className={`${styles.profile} font-bold`}>
                      <MDBCardText>Thời gian thuê</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="5" className={styles.profile}>
                      <MDBCardText className="text-muted font-bold">1 giờ</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className={styles.profile_container} style={{ justifyContent: "space-between" }}>
                    <MDBCol sm="3" className={`${styles.profile} font-bold`}>
                      <MDBCardText>Phí</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="5" className={styles.profile}>
                      <MDBCardText className="text-muted font-bold">40 Xu</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className={styles.profile_container} style={{ justifyContent: "space-between" }}>
                    <MDBCol sm="4" className={`${styles.profile} font-bold`}>
                      <MDBCardText>Điền link meet</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="5" className={styles.profile}>
                      <TextField
                        sx={{ paddingBottom: "20px" }}
                        id="standard-basic"
                        label="Link Meet"
                        variant="standard"
                        name="meetUrl"
                        value={meetUrl}
                        onChange={(event) => {
                          setMeetUrl(event.target.value);
                        }}
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBModalBody>

            <MDBModalFooter style={{ gap: "10px" }}>
              <Button onClick={handleAccept} variant='contained' style={{ background: "#f0564a" }}>Chấp nhận</Button>
              <Button variant='contained' style={{ background: "white", color: "black" }} onClick={() => setBasicModal(false)}>
                Đóng
              </Button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}