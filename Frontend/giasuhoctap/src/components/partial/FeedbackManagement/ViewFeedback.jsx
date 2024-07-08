import React, { useEffect, useState } from 'react'
import Header from '../TutorManagement/Header'
import PageNavigation from '../TutorManagement/PageNavigation';
import PageSize from '../TutorManagement/PageSize';
import { GetNotificationTypeSystem } from '../../../api/NotificationApi';
import { toast } from 'react-toastify';
import NotificationTable from './FeedbackTable';
import CreateModal from './CreateModal';
import { Button } from '@mui/material';
import UpdateModal from './UpdateModal';
import DeleteModal from './DeleteModal';
export default function ViewFeedback() {
    const [totalPages, setTotalPages] = useState();
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(5);
    const [data, setData] = useState([]);
    const [centredModal, setCentredModal] = useState(false);
    const [isCreated, setIsCreated] = useState(false);
    const [dataDetail, setDataDetail] = useState();
    const [openDetail, setOpenDetail] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    useEffect(() => {
        const getAllNotification = async () => {
            const response = await GetNotificationTypeSystem(page, pageSize);
            if (response.ok) {
                const responseJson = await response.json();
                const data = responseJson.data.data;
                setData(data);
                setTotalPages(responseJson.data.totalPages)
            } else {
                toast.error("Error getting transaction")
            }
        }
        getAllNotification();
    }, [page, totalPages, pageSize, isCreated])

    const handleClickUpdate = (data) => {
        setDataDetail(data)
        setOpenDetail(true);
    };
    const handleClickDelete = (data) => {
        setDataDetail(data)
        setOpenDelete(true);
    };
    const handleClose = () => {
        setOpenDelete(false);
    }
    return (
        <div style={{
            padding: "25px 25px 5px 25px",
            borderRadius: "10px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}>
            <Header>
                <div style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "20px" }}>
                    Thông báo hệ thống
                </div>
            </Header>
            <div style={{ marginBottom: "20px" }}>
                <Button variant="contained" style={{ fontWeight: "bold" }} onClick={() => setCentredModal(true)}>Tạo tin tức</Button>
            </div>
            <NotificationTable data={data} handleClickUpdate={handleClickUpdate} handleClickDelete={handleClickDelete} />
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
            <CreateModal centredModal={centredModal} setCentredModal={setCentredModal} isCreated={isCreated} setIsCreated={setIsCreated} />
            <UpdateModal openDetail={openDetail} setOpenDetail={setOpenDetail} dataDetail={dataDetail} isCreated={isCreated} setIsCreated={setIsCreated} />
            <DeleteModal show={openDelete} handleClose={handleClose} data={dataDetail} isCreated={isCreated} setIsCreated={setIsCreated} />
        </div>
    )
}
