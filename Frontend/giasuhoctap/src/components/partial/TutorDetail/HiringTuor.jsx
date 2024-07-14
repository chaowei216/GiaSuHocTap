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
  MDBTextArea,
} from 'mdb-react-ui-kit';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import styles from "../../partial/Profile/UserProfile.module.css"
import useAuth from '../../../hooks/useAuth';
import { CreateOnlineRequest } from '../../../api/TutorManagementApi';
import { toast } from 'react-toastify';

export default function HiringTuor({ basicModal, setBasicModal, data }) {
  const currentDate = new Date().toISOString();
  const { user } = useAuth();
  const [classPicked, setClassPicked] = useState("");
  const handleChangeClass = (event) => {
    setClassPicked(event.target.value);
  };
  const [subjectPicked, setSubjectPicked] = useState("");
  const handleChangeSubject = (event) => {
    setSubjectPicked(event.target.value);
  }
  const timeTableId = data?.timeTables?.[0]?.timeTableId || null;
  const [inputData, setInputData] = useState({
    fromId: null,
    description: '',
    coin: 50,
    courseId: null,
    classId: null,
    timeTableId: null,
    cretaeDate: currentDate
  });
  const handleClicked = async () => {
    if (data && user) {
      const updatedFormData = {
        ...inputData,
        fromId: user?.userId,
        courseId: Number(subjectPicked),
        classId: Number(classPicked),
        timeTableId: timeTableId,
      };
      console.log(updatedFormData);
      const response = await CreateOnlineRequest(updatedFormData)
      if (response.ok) {
        const responseJson = await response.json();
        if (responseJson.statusCode) {
          toast.success("Yêu cầu thành công")
          setBasicModal(false);
          window.location.reload();
        } else {
          toast.error("Thuê không thành công. Vui lòng kiểm tra lại !")
        }
      } else {
        toast.error("Thuê không thành công. Vui lòng kiểm tra lại !")
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
      <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex='-1'>
        <MDBModalDialog size='lg'>
          <MDBModalContent>
            <MDBModalHeader className='justify-center'>
              <MDBModalTitle className='text-xl font-bold'>THUÊ GIA SƯ ONLINE</MDBModalTitle>
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
                      <MDBCardText>Chọn môn thuê</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="5" className={styles.profile}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Môn học</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={subjectPicked}
                          label="Môn học"
                          onChange={handleChangeSubject}
                        >
                          {data?.userCourses?.map((item, index) => (
                            <MenuItem key={index} value={item.course.courseId}>{item.course.courseName}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className={styles.profile_container} style={{ justifyContent: "space-between", marginBottom: "20px" }}>
                    <MDBCol sm="3" className={`${styles.profile} font-bold`}>
                      <MDBCardText>Lớp học</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="5" className={styles.profile}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Lớp học</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={classPicked}
                          label="Lớp học"
                          onChange={handleChangeClass}
                        >
                          {data?.userClasses?.map((item, index) => (
                            <MenuItem key={index} value={item.class.classId}>{item.class.className}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
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
                      <MDBCardText className="text-muted font-bold">50 xu</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className={styles.profile_container} style={{ justifyContent: "space-between" }}>
                    <MDBCol sm="3" className={`${styles.profile} font-bold`}>
                      <MDBCardText>Số coin dư hiện tại</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="5" className={styles.profile}>
                      <MDBCardText className="text-red-500 font-bold">{user?.coinBalance || "0"} xu</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
              <MDBTextArea
                placeholder="Ghi chú thêm ..."
                style={{ marginLeft: "16px", width: "96%" }}
                contrast
                id="textAreaExample"
                rows={3}
                name="description"
                value={inputData.description}
                onChange={handleChange}
              />

            </MDBModalBody>

            <MDBModalFooter style={{ gap: "10px" }}>
              <Button onClick={handleClicked} variant='contained' style={{ background: "#f0564a" }}>Thuê</Button>
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