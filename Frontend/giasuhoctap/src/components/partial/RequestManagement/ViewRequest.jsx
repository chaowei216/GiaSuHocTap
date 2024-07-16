import React, { useEffect, useState } from 'react'
import Header from '../TutorManagement/Header'
import MiddleContent from './MiddleContent'
import PageNavigation from '../TutorManagement/PageNavigation';
import PageSize from '../TutorManagement/PageSize';
import AcceptTeach from './AcceptTeach';
import DenyTeach from './DenyTeach';
import RequestTableOnline from './RequestTableOnline';
import useAuth from '../../../hooks/useAuth';
import { GetPendingOnlineApi, GetRequestById, GetRequestOnlineApi } from '../../../api/RequestApi';
import { toast } from 'react-toastify';
import WaitingModal from '../../global/WaitingModal';
import { Logout } from '../../../api/AuthenApi';
import { useNavigate } from 'react-router-dom';
export default function ViewRequest() {
    const { user, f5User, logout } = useAuth()
    const [type, setType] = useState("All");
    const [totalPages, setTotalPages] = useState();
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(5);
    const [data, setData] = useState();
    const [parent, setParent] = useState({});
    const [showModalDelete, setShowmodalDelete] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
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

    const handleClose = () => {
        setShowmodalDelete(false);
    };
    const fetchDataByType = async (type) => {
        try {
            let response;
            switch (type) {
                case 'All':
                    response = await GetRequestOnlineApi(user.userId, page, pageSize);
                    break;
                case 'Pending':
                    response = await GetPendingOnlineApi(user.userId, page, pageSize);
                    break;
                case 'Teaching':
                    response = await GetRequestById(user.userId, "Online", "Đã chấp nhận", page, pageSize);
                    break;
                case 'Done':
                    response = await GetRequestById(user.userId, "Online", "Hoàn thành", page, pageSize);
                    break;
                case 'Deny':
                    response = await GetRequestById(user.userId, "Online", "Từ chối", page, pageSize);
                    break;
                default:
                    throw new Error(`Unknown type: ${type}`);
            }
            handleApiResponse(response);
        } catch (error) {
            console.log(error);
        }
    };
    const handleApiResponse = async (response) => {
        try {
            if (response && response.ok) {
                const responseJson = await response.json();
                const data = responseJson.data.data;
                setData(data);
                setTotalPages(responseJson.data.totalPages);
                console.log(data);

            } else {
                toast.warning("Lỗi sever");
                setData(null);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (user) {
            fetchDataByType(type);
        }
    }, [type, user, page, pageSize, isUpdated]);

    const [basicModal, setBasicModal] = useState(false);
    const handleHire = (item) => {
        setParent(item);
        setBasicModal(true);
    }
    const handleOpenDeny = (item) => {
        setShowmodalDelete(true);
        setParent(item);
    }
    return (
        <div style={{
            padding: "25px 25px 5px 25px",
            borderRadius: "10px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}>
            <Header>
                <div style={{ fontSize: "30px", fontWeight: "bold" }}>
                    Danh sách học sinh yêu cầu online
                </div>
            </Header>
            <MiddleContent type={type} setType={setType} online={true} isUpdated={isUpdated} />
            <RequestTableOnline data={data} handleHire={handleHire} handleOpenDeny={handleOpenDeny} type={type} setIsUpdated={setIsUpdated} isUpdated={isUpdated} setIsModalOpen={setIsModalOpen} />
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
            <AcceptTeach basicModal={basicModal} setBasicModal={setBasicModal} data={parent} setIsUpdated={setIsUpdated} isUpdated={isUpdated} setIsModalOpen={setIsModalOpen} />
            <DenyTeach show={showModalDelete} handleClose={handleClose} data={parent} setIsUpdated={setIsUpdated} isUpdated={isUpdated} setIsModalOpen={setIsModalOpen} />
            <WaitingModal open={isModalOpen} setOpen={setIsModalOpen} />
        </div>
    )
}
