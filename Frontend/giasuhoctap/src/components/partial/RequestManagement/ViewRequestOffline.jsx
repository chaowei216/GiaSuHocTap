import React, { useEffect, useState } from 'react'
import Header from '../TutorManagement/Header'
import MiddleContent from './MiddleContent'
import RequestTable from './RequestTable';
import PageNavigation from '../TutorManagement/PageNavigation';
import PageSize from '../TutorManagement/PageSize';
import { toast } from 'react-toastify';
import { GetRequestOfflineApi } from '../../../api/RequestApi';
import useAuth from '../../../hooks/useAuth';
export default function ViewRequestOffline() {
    const { user } = useAuth()
    const [totalPages, setTotalPages] = useState();
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(5);
    const [data, setData] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    useEffect(() => {
        if (user) {
            const getAllTrans = async () => {
                const response = await GetRequestOfflineApi(user?.userId, page, pageSize);
                if (response.ok) {
                    const responseJson = await response.json();
                    const data = responseJson.data.data;
                    setData(data);
                    setTotalPages(responseJson.data.totalPages)
                } else {
                    toast.error("Error getting transaction")
                }
            }
            getAllTrans();
        }
    }, [page, totalPages, pageSize, user, isUpdated])

    return (
        <div style={{
            padding: "25px 25px 5px 25px",
            borderRadius: "10px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}>
            <Header>
                <div style={{ fontSize: "30px", fontWeight: "bold" }}>
                    Danh sách học sinh yêu cầu offline
                </div>
            </Header>
            <MiddleContent />
            <RequestTable data={data} setIsUpdated={setIsUpdated} isUpdated={isUpdated} />
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
        </div>
    )
}
