import React, { useEffect, useState } from 'react'
import Header from '../TutorManagement/Header'
import MiddleContent from './MiddleContent'
import data from "../../../data/fakeData.json"
import PageNavigation from '../TutorManagement/PageNavigation';
import PageSize from '../TutorManagement/PageSize';
import AcceptTeach from './AcceptTeach';
import DenyTeach from './DenyTeach';
import RequestTableOnline from './RequestTableOnline';
import useAuth from '../../../hooks/useAuth';
import { GetRequestOnlineApi } from '../../../api/RequestApi';
import { toast } from 'react-toastify';
export default function ViewRequest() {
    const { user } = useAuth()
    const [type, setType] = useState("All");
    const [totalPages, setTotalPages] = useState();
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(5);
    const [data, setData] = useState();
    const [parent, setParent] = useState({});
    const [showModalDelete, setShowmodalDelete] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [totalCount, setTotalCount] = useState("")
    const handleClose = () => {
        setShowmodalDelete(false);
    };
    useEffect(() => {
        if (user && type) {
            const getAllTrans = async () => {
                try {
                    let response;
                    switch (type) {
                        case 'All':
                            response = await GetRequestOnlineApi(user.userId, page, pageSize);
                            break;
                        case 'Pending':
                            response = "zz";
                            break;
                        case 'Active':
                            response = "zz";
                            break;
                        default:
                            throw new Error(`Unknown type: ${type}`);
                    }
                    // Kiểm tra response có hợp lệ
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
            getAllTrans();
        }
    }, [page, totalPages, pageSize, user, isUpdated, type])

    const [basicModal, setBasicModal] = useState(false);
    const handleHire = (item) => {
        setParent(item);
        setBasicModal(true);
    }
    const handleOpenDeny = (row) => {
        setShowmodalDelete(true);
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
            <MiddleContent totalCount={totalCount} type={type} setType={setType} />
            <RequestTableOnline data={data} handleHire={handleHire} handleOpenDeny={handleOpenDeny} />
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
            <AcceptTeach basicModal={basicModal} setBasicModal={setBasicModal} data={parent} />
            <DenyTeach show={showModalDelete} handleClose={handleClose} />
        </div>
    )
}
