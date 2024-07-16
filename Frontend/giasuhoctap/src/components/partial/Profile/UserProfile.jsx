import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBListGroup,
    MDBListGroupItem,
    MDBInput
} from 'mdb-react-ui-kit';
import styles from "./UserProfile.module.css"
import useAuth from "../../../hooks/useAuth"
import PaidIcon from '@mui/icons-material/Paid';
import CheckIcon from '@mui/icons-material/Check';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import ReportIcon from '@mui/icons-material/Report';
import WaitingModal from '../../global/WaitingModal';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logout } from '../../../api/AuthenApi';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { Button } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { UpdatePassword } from '../../../api/UserApi';
import { toast } from 'react-toastify';
const baseUrl = import.meta.env.VITE_API_HOST;
export default function PersonalProfile() {
    const { user, f5User, logout } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [value, setValue] = useState("");
    const [active, setActive] = useState(true);
    const handleActive = () => {
        setActive(!active);
    }
    const validatePassword = (password) => {
        const specialCharRegex = /[^A-Za-z0-9]/; // Biểu thức chính quy để kiểm tra ký tự đặc biệt
        if (!password) {
            toast.error('Mật khẩu không được để trống');
            return false;
        } else if (password.length < 8 || password.length > 20) {
            toast.error('Mật khẩu phải có độ dài từ 8 đến 20 ký tự');
            return false;
        } else if (!specialCharRegex.test(password)) {
            toast.error('Mật khẩu phải có ít nhất 1 ký tự đặc biệt');
            return false;
        }
        return true;
    };

    const handleSave = async () => {
        if (!validatePassword(value)) {
            setActive(true);
            return;
        } else {
            if (user) {
                const newPassword = { password: value }
                const response = await UpdatePassword(user?.userId, newPassword);
                if (response.status == 204) {
                    toast.success('Cập nhật mật khẩu thành công');
                    setValue('')
                    setActive(true);
                } else {
                    toast.error('Hiện đang bị lỗi. Vui lòng kiểm tra lại!');
                    setValue('')
                    setActive(true);
                }
                setActive(true);
            }
        }
    };
    const navigate = useNavigate()
    useEffect(() => {
        const checkUser = async () => {
            const email = user?.email;
            if (email) {
                await f5User(email); // Fetch and update user information
                if (user?.status === "InActive") {
                    if (await confirm("Bạn đã bị phụ huynh tố cáo quá nhiều nên chúng tôi quyết định cấm tài khoản bạn")) {
                        const refreshToken = localStorage.getItem("refreshToken");
                        const response = await Logout(refreshToken);
                        if (response.ok) {
                            await logout();
                            navigate('/login');
                        }
                    }
                }
            }
        };
        const interval = setInterval(checkUser, 5000);

        return () => clearInterval(interval);
    }, [user?.email, f5User, logout, navigate, user?.status]);
    return (
        <>
            <section style={{ backgroundColor: '#eee' }}>
                <MDBContainer className="py-5">
                    <MDBRow>
                        <MDBCol lg="4">
                            <MDBCard className="mb-4">
                                <MDBCardBody className="text-center" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <MDBCardImage
                                        src={`${baseUrl}/api/Auth/user-image?fileName=${user?.userImage}`}
                                        alt="avatar"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp";
                                        }}
                                        className="rounded-circle"
                                        style={{ width: '150px', marginBottom: "20px" }}
                                    />
                                    <p className="text-muted mb-1">{user?.roleName}</p>
                                    <p className="text-muted mb-4">{user?.fullname}</p>
                                </MDBCardBody>
                            </MDBCard>

                            <MDBCard className="mb-4 mb-lg-0">
                                <MDBCardBody className="p-0">
                                    <MDBListGroup flush className="rounded-3">
                                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                            <MDBCardText>Số xu hiện có: {user?.coinBalance}</MDBCardText>
                                            <PaidIcon />
                                        </MDBListGroupItem>
                                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                            <MDBCardText>Trạng thái: {user?.status}</MDBCardText>
                                            <CheckIcon />
                                        </MDBListGroupItem>
                                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                            <MDBCardText>Đã được verify: {user?.isVerified == true ? "Yes" : "No"}</MDBCardText>
                                            <CheckIcon />
                                        </MDBListGroupItem>
                                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                            <MDBCardText>CCCD: {user?.identityNumber}</MDBCardText>
                                            <FingerprintIcon />
                                        </MDBListGroupItem>
                                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                            <MDBCardText>Đã bị tố cáo: {user?.numberOfReport} lần</MDBCardText>
                                            <ReportIcon />
                                        </MDBListGroupItem>
                                    </MDBListGroup>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol lg="8">
                            <MDBCard className="mb-4">
                                <MDBCardBody>
                                    <MDBRow className={styles.profile_container}>
                                        <MDBCol sm="3" className={styles.profile}>
                                            <MDBCardText>Họ và tên</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9" className={styles.profile}>
                                            <MDBCardText className="text-muted">{user?.fullname}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow className={styles.profile_container}>
                                        <MDBCol sm="3" className={styles.profile}>
                                            <MDBCardText>Email</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9" className={styles.profile}>
                                            <MDBCardText className="text-muted">{user?.email}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow className={styles.profile_container}>
                                        <MDBCol sm="3" className={styles.profile}>
                                            <MDBCardText>Số điện thoại</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9" className={styles.profile}>
                                            <MDBCardText className="text-muted">{user?.phonenumber}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow className={styles.profile_container}>
                                        <MDBCol sm="3" className={styles.profile}>
                                            <MDBCardText>Giới tính</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9" className={styles.profile}>
                                            <MDBCardText className="text-muted">{user?.gender}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow className={styles.profile_container}>
                                        <MDBCol sm="3" className={styles.profile}>
                                            <MDBCardText>Địa chỉ</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9" className={styles.profile}>
                                            <MDBCardText className="text-muted">{user?.address}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    {(user?.roleName == 'Moderator' || user?.roleName == 'Tutor') && (
                                        <MDBRow className={styles.profile_container}>
                                            <MDBCol sm="3" className={styles.profile}>
                                                <MDBCardText>Mật khẩu</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9" className={styles.profile} style={{ display: "flex", alignItems: "center" }}>
                                                <MDBCardText className="text-muted">
                                                    <MDBInput
                                                        value={active ? '*****' : value}
                                                        onChange={(e) => setValue(e.target.value)}
                                                        id='controlledValue'
                                                        type='text'
                                                        size="sm"
                                                        disabled={active}
                                                        style={{ width: "160px" }}
                                                    /></MDBCardText>
                                                {active ? (
                                                    <Button onClick={handleActive} style={{ marginLeft: "20px" }}>
                                                        <DriveFileRenameOutlineIcon />
                                                    </Button>
                                                ) : (
                                                    <Button onClick={handleSave} style={{ marginLeft: "20px" }}>
                                                        <DoneIcon />
                                                    </Button>
                                                )}
                                            </MDBCol>
                                        </MDBRow>
                                    )}
                                </MDBCardBody>
                            </MDBCard>
                            <MDBRow>
                                <MDBCol>
                                    <MDBCard className="mb-4 mb-md-0">
                                        <MDBCardBody>
                                            <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Phần khác</span></MDBCardText>
                                            <hr className="my-4" />
                                            <div className="d-flex justify-content-start align-items-center">
                                                <p className="mb-0 text-uppercase"><i className="fas fa-cog me-2"></i> <span
                                                    className="text-muted small">Gia Sư Học Tâp</span></p>
                                                <p className="mb-0 text-uppercase"><i className="fas fa-ellipsis-h ms-4 me-2"></i> <span
                                                    className="text-muted small">Email: contact@giasuhoctap.com
                                                </span>
                                                    <span className="ms-3 me-4">|</span></p>
                                                <span className="text-muted small">{user?.fullname || "Admin"}</span>
                                            </div>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>

                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
            <WaitingModal open={false} setOpen={setIsModalOpen} />
        </>
    );
}