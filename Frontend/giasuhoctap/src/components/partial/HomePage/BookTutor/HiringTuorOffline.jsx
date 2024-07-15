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
import { CreateOfflineRequest } from '../../../../api/TutorManagementApi';
import { toast } from 'react-toastify';
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
  const [inputData, setInputData] = useState({
    userId: '',
    tutorId: '',
    location: '',
    description: '',
    price: 1,
    courseId: null,
    classId: null
  });
  const handleClicked = async () => {
    if (data && user) {
      const updatedFormData = {
        ...inputData,
        userId: user?.userId,
        tutorId: data?.userId,
        price: Number(inputData.price),
        courseId: Number(subjectPicked),
        classId: Number(classPicked)
      };
      console.log(updatedFormData);
      const response = await CreateOfflineRequest(updatedFormData)
      if (response.ok) {
        const responseJson = await response.json();
        if (responseJson.statusCode) {
          toast.success("Yêu cầu thành công")
          setBasicModal(false);
          window.setTimeout(() => {
            window.location.reload();
          }, 1500)
        } else {
          toast.error("Đăng ký học gia sư thất bại. Vui lòng kiểm tra lại !")
        }
      } else {
        toast.error("Đăng ký học gia sư thất bại. Vui lòng kiểm tra lại !")
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
                            <MenuItem key={index} value={item.course.courseId}>{item.course.courseName}</MenuItem>
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
                            <MenuItem key={index} value={item.class.classId}>{item.class.className}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className={styles.profile_container} style={{ justifyContent: "space-between", marginBottom: "5px" }}>
                    <MDBCol sm="3" className={`${styles.profile} font-bold`}>
                      <MDBCardText>Chi phí</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="5" className={styles.profile}>
                      <MDBCardText className="text-muted font-bold">10 Coins</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className={styles.profile_container} style={{ justifyContent: "space-between", marginBottom: "15px" }}>
                    <MDBCol sm="4" className={`${styles.profile} font-bold`}>
                      <MDBCardText>Lương dự định thuê gia sư</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="5" className={styles.profile}>
                      <TextField
                        id="standard-basic"
                        label="Lương"
                        variant="standard"
                        name="price"
                        type='number'
                        inputProps={{ min: 1 }}
                        value={inputData.price}
                        onChange={handleChange}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className={styles.profile_container} style={{ justifyContent: "space-between", marginBottom: "15px" }}>
                    <MDBCol sm="3" className={`${styles.profile} font-bold`}>
                      <MDBCardText>Địa điểm cung cấp</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="5" className={styles.profile}>
                      <TextField
                        id="standard-basic"
                        label="Địa điểm"
                        variant="standard"
                        name="location"
                        value={inputData.location}
                        onChange={handleChange}
                      />
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