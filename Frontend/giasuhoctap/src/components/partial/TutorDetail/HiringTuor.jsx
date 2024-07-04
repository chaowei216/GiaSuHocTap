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
import { Button } from '@mui/material';
import styles from "../../partial/Profile/UserProfile.module.css"
import useAuth from '../../../hooks/useAuth';

export default function HiringTuor({basicModal, setBasicModal}) {
  const { user } = useAuth();

  return (
    <>
      <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex='-1'>
        <MDBModalDialog size='lg'>
          <MDBModalContent>
            <MDBModalHeader className='justify-center'>
              <MDBModalTitle className='text-xl font-bold'>THUÊ GIA SƯ ONLINE</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBCard className="mb-4" style={{ border: "none" }}>
                <MDBCardBody>
                  <MDBRow className={styles.profile_container} style={{ justifyContent: "space-between" }}>
                    <MDBCol sm="3" className={`${styles.profile} font-bold`}>
                      <MDBCardText>Tên gia sư thuê: </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="5" className={styles.profile}>
                      <MDBCardText className="text-muted font-bold">{user?.fullname}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className={styles.profile_container} style={{ justifyContent: "space-between" }}>
                    <MDBCol sm="3" className={`${styles.profile} font-bold`}>
                      <MDBCardText>Môn học</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="5" className={styles.profile}>
                      <MDBCardText className="text-muted font-bold">{user?.address}</MDBCardText>
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
                      <MDBCardText>Chi phí</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="5" className={styles.profile}>
                      <MDBCardText className="text-muted font-bold">100,000 VND</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className={styles.profile_container} style={{ justifyContent: "space-between" }}>
                    <MDBCol sm="3" className={`${styles.profile} font-bold`}>
                      <MDBCardText>Số coin dư hiện tại</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="5" className={styles.profile}>
                      <MDBCardText className="text-red-500 font-bold">{user?.coinBalance}đ</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBModalBody>

            <MDBModalFooter style={{gap: "10px"}}>
              <Button variant='contained' style={{ background: "#f0564a" }}>Thuê</Button>
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