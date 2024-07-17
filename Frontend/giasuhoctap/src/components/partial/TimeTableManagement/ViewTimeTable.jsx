import React, { useEffect, useState } from 'react'
import Header from '../TutorManagement/Header'
import PageNavigation from '../TutorManagement/PageNavigation';
import PageSize from '../TutorManagement/PageSize';
import { GetNotificationTypeSystem } from '../../../api/NotificationApi';
import { toast } from 'react-toastify';
import TimeTable from './TimeTable';
import UpdateTimeTable from './UpdateTimeTable';
import { ActiveTimeTable, DeActiveTimeTable, GetTimeTableByEmail } from '../../../api/TimetableApi';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { Logout } from '../../../api/AuthenApi';
import WaitingModal from '../../global/WaitingModal';
export default function ViewTimeTable() {
    const { user, f5User, logout } = useAuth()
    let { email } = useParams();
    const [totalPages, setTotalPages] = useState();
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(20);
    const [data, setData] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
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
        const interval = setInterval(checkUser, 10000);
        return () => clearInterval(interval);
    }, [user?.email, f5User, logout, navigate, user?.status]);
    useEffect(() => {
        const getAllTimetable = async () => {
            const response = await GetTimeTableByEmail(email, page, pageSize);
            if (response.ok) {
                const responseJson = await response.json();
                const data = responseJson.data.data;
                setData(data);
                setTotalPages(responseJson.data.totalPages)
            } else {
                toast.error("Lỗi sever")
            }
        }
        getAllTimetable();
    }, [page, totalPages, pageSize, isCreated, email])

    const handleClickUpdate = () => {
        setOpenDetail(true);
    };
    const handleClickDelete = async (data) => {
        if (data) {
            const response = await DeActiveTimeTable(data)
            if (response.ok) {
                const responseJson = await response.json();
                if (responseJson.statusCode == 200) {
                    toast.success("Hủy thời gian biểu thành công")
                    setIsCreated(!isCreated)
                } else {
                    toast.error(responseJson.message)
                }
            } else {
                toast.error("Lỗi sever")
            }
        }
    };
    const handleActive = async (data) => {
        if (data) {
            const response = await ActiveTimeTable(data)
            if (response.ok) {
                const responseJson = await response.json();
                if (responseJson.statusCode == 200) {
                    toast.success("Kích hoạt lại thời gian biểu thành công")
                    setIsCreated(!isCreated)
                } else {
                    toast.error(responseJson.message)
                }
            } else {
                toast.error("Lỗi sever")
            }
        }
    };
    return (
        <div style={{
            padding: "25px 25px 5px 25px",
            borderRadius: "10px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}>
            <Header>
                <div style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "20px" }}>
                    Thời gian của gia sư
                </div>
            </Header>
            <TimeTable data={data} handleClickUpdate={handleClickUpdate} handleClickDelete={handleClickDelete} handleActive={handleActive} />
            {data && data.length > 0 && (
                <>
                    <div
                        style={{
                            position: "relative",
                            minHeight: "80px"
                        }}
                    >
                        <ul style={{
                            marginTop: "28px", marginBottom: "10px", position: "absolute",
                            left: "50%",
                            transform: "translate(-50%)",
                        }}>
                            <PageNavigation
                                page={page}
                                setPage={setPage}
                                totalPages={totalPages}
                            />
                        </ul>
                        <ul style={{ float: "right", marginTop: "12px" }} >
                            <PageSize pageSize={pageSize} setPageSize={setPageSize} />
                        </ul>
                    </div>
                </>
            )}
            <UpdateTimeTable openDetail={openDetail} setOpenDetail={setOpenDetail} isCreated={isCreated} setIsCreated={setIsCreated} />
            <WaitingModal open={isModalOpen} setOpen={setIsModalOpen} />
        </div>
    )
}
