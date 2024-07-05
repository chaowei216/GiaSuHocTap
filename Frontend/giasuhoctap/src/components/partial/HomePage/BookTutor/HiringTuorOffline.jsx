import { useState } from 'react';
import {
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
  MDBTextArea,
} from 'mdb-react-ui-kit';
import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import styles from "../../../partial/Profile/UserProfile.module.css"
import useAuth from '../../../../hooks/useAuth';
import SchoolIcon from '@mui/icons-material/School';
export default function HiringTuorOffline({ basicModal, setBasicModal, data }) {
  const { user } = useAuth();
  const [classPicked, setClassPicked] = useState("");
  const handleChangeClass = (event) => {
    setClassPicked(event.target.value);
  };
  const [subjectPicked, setSubjectPicked] = useState("");
  const handleChangeSubject = (event) => {
    setSubjectPicked(event.target.value);
  }
  return (
    <>
      <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex='-1'>
        <MDBModalDialog size='lg'>
          <MDBModalContent>
            <MDBModalHeader className='justify-center'>
              <MDBModalTitle className='text-xl font-bold'>THUÊ GIA SƯ OFFLINE</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBCard className="mb-4" style={{ border: "none" }}>
                <MDBCardBody>
                  <MDBRow className={styles.profile_container} style={{ justifyContent: "space-between", marginBottom: "10px" }}>
                    <MDBCol sm="3" className={`${styles.profile} font-bold`}>
                      <MDBCardText>Tên gia sư thuê: </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="5" className={styles.profile}>
                      <MDBCardText className="text-muted font-bold">{data?.fullname}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className={styles.profile_container} style={{ justifyContent: "space-between", marginBottom: "24px" }}>
                    <MDBCol sm="3" className={`${styles.profile} font-bold`}>
                      <MDBCardText>Chọn môn sẽ học</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="5" className={styles.profile}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Chọn môn học</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={subjectPicked}
                          label="Chọn môn học"
                          onChange={handleChangeSubject}
                        >
                          {data?.userCourses?.map((item, index) => (
                            <MenuItem key={index} value={item.course.description}>{item.course.description}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className={styles.profile_container} style={{ justifyContent: "space-between", marginBottom: "15px" }}>
                    <MDBCol sm="3" className={`${styles.profile} font-bold`}>
                      <MDBCardText>Chọn lớp sẽ học</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="5" className={styles.profile}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Chọn lớp học</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={classPicked}
                          label="Chọn lớp học"
                          onChange={handleChangeClass}
                        >
                          {data?.userClasses?.map((item, index) => (
                            <MenuItem key={index} value={item.class.className}>{item.class.className}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className={styles.profile_container} style={{ justifyContent: "space-between" }}>
                    <MDBCol sm="3" className={`${styles.profile} font-bold`}>
                      <MDBCardText>Chi phí</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="5" className={styles.profile}>
                      <MDBCardText className="text-muted font-bold">10 Coins</MDBCardText>
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
              <MDBTextArea placeholder='Ghi chú thêm ...' style={{ marginLeft: "16px", width: "96%" }} contrast id='textAreaExample' rows={3}></MDBTextArea>
            </MDBModalBody>

            <MDBModalFooter style={{ gap: "10px" }}>
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