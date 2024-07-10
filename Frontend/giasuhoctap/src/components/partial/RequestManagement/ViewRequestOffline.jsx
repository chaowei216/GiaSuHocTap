import React, { useEffect, useState } from 'react'
import Header from '../TutorManagement/Header'
import MiddleContent from './MiddleContent'
import RequestTable from './RequestTable';
import PageNavigation from '../TutorManagement/PageNavigation';
import PageSize from '../TutorManagement/PageSize';
import { toast } from 'react-toastify';
import { GetRequestById, GetRequestOfflineApi } from '../../../api/RequestApi';
import useAuth from '../../../hooks/useAuth';
export default function ViewRequestOffline() {
    const { user } = useAuth()
    const [totalPages, setTotalPages] = useState();
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(5);
    const [data, setData] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const [type, setType] = useState("All");
    const [totalCount, setTotalCount] = useState("")
    const fetchDataByType = async (type) => {
        try {
            let response;
            switch (type) {
                case 'All':
                    response = await GetRequestOfflineApi(user.userId, page, pageSize);
                    break;
                case 'Pending':
                    response = await GetRequestById(user.userId, "Offline", "Chờ xác nhận", page, pageSize);
                    break;
                case 'Teaching':
                    response = await GetRequestById(user.userId, "Offline", "Đang tiến hành", page, pageSize);
                    break;
                case 'Done':
                    response = await GetRequestById(user.userId, "Offline", "Hoàn thành", page, pageSize);
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
                setTotalCount(responseJson.data.totalCount)
            } else {
                toast.warning("Error getting request");
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
            <MiddleContent type={type} setType={setType} totalCount={totalCount} />
            <RequestTable data={data} setIsUpdated={setIsUpdated} isUpdated={isUpdated} type={type} />
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
