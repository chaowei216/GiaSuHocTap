import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBProgress,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem
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
const baseUrl = import.meta.env.VITE_API_HOST;
export default function PersonalProfile() {
    const { user, f5User, logout } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
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
                                            <MDBCardText>Số coin hiện có: {user?.coinBalance}</MDBCardText>
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
                                            <MDBCardText>Số của report: {user?.numberOfReport}</MDBCardText>
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
                                </MDBCardBody>
                            </MDBCard>
                            <MDBRow>
                                <MDBCol>
                                    <MDBCard className="mb-4 mb-md-0">
                                        <MDBCardBody>
                                            <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Tiến trình</span></MDBCardText>
                                            <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Xuyên suốt</MDBCardText>
                                            <MDBProgress className="rounded">
                                                <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                                            </MDBProgress>

                                            <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Khả năng</MDBCardText>
                                            <MDBProgress className="rounded">
                                                <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                                            </MDBProgress>

                                            <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Ổn định</MDBCardText>
                                            <MDBProgress className="rounded">
                                                <MDBProgressBar width={69} valuemin={0} valuemax={100} />
                                            </MDBProgress>
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