import React, { useEffect, useState } from 'react'
import Header from '../TutorManagement/Header'
import PageNavigation from '../TutorManagement/PageNavigation';
import PageSize from '../TutorManagement/PageSize';
import { toast } from 'react-toastify';
import NotificationTable from './FeedbackTable';
import { GetAllFeedback } from '../../../api/FeedbackApi';
import WaitingModal from '../../global/WaitingModal';
export default function ViewFeedback() {
    const [totalPages, setTotalPages] = useState();
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(5);
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    useEffect(() => {
        const getAllNotification = async () => {
            const response = await GetAllFeedback(page, pageSize);
            if (response.ok) {
                const responseJson = await response.json();
                const data = responseJson.data.data;
                setData(data);
                setTotalPages(responseJson.data.totalPages)
            } else {
                toast.error("Error getting feedback")
            }
        }
        getAllNotification();
    }, [page, totalPages, pageSize])

    return (
        <div style={{
            padding: "25px 25px 5px 25px",
            borderRadius: "10px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}>
            <Header>
                <div style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "20px" }}>
                    Danh sách đánh giá của người dùng
                </div>
            </Header>
            <NotificationTable data={data} />
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
            <WaitingModal open={false} setOpen={setIsModalOpen} />
        </div>
    )
}
