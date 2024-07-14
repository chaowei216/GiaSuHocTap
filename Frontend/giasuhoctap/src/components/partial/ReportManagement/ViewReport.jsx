import React, { useEffect, useState } from 'react'
import Header from '../TutorManagement/Header'
import PageNavigation from '../TutorManagement/PageNavigation';
import PageSize from '../TutorManagement/PageSize';
import { toast } from 'react-toastify';
import NotificationTable from './ReportTable';
import { GetAllReport, GetAllReportByCondition } from '../../../api/ReportApi';
import { Button, TextField } from '@mui/material';
import WaitingModal from '../../global/WaitingModal';
export default function ViewReport() {
    const [totalPages, setTotalPages] = useState();
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(5);
    const [data, setData] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const handleFilter = async () => {
        setPage(1)
        if ((from || to) != "") {
            const response = await GetAllReportByCondition(from.trim(), to.trim(), page, pageSize);
            if (response.ok) {
                const responseJson = await response.json();
                const data = responseJson.data.data;
                if (data.length == 1) console.log("true");
                setData(data);
                setTotalPages(responseJson.data.totalPages)
                setIsSearch(true)
            } else {
                toast.error("Error getting report")
            }
        } else {
            setIsSearch(false)
        }
    }
    const handleReset = async () => {
        setPage(1)
        setFrom("")
        setTo("")
        const response = await GetAllReport(page, pageSize);
        if (response.ok) {
            const responseJson = await response.json();
            const data = responseJson.data.data;
            setData(data);
            setTotalPages(responseJson.data.totalPages)
            setIsSearch(false)
        } else {
            toast.error("Error getting report")
        }
    }

    useEffect(() => {
        const getAllNotification = async () => {
            if (isSearch) {
                if ((from || to) != "") {
                    const response = await GetAllReportByCondition(from.trim(), to.trim(), page, pageSize);
                    if (response.ok) {
                        const responseJson = await response.json();
                        const data = responseJson.data.data;
                        setData(data);
                        setTotalPages(responseJson.data.totalPages)
                        setIsSearch(true)
                    } else {
                        toast.error("Error getting report")
                    }
                } else {
                    const response = await GetAllReport(page, pageSize);
                    if (response.ok) {
                        const responseJson = await response.json();
                        const data = responseJson.data.data;
                        setData(data);
                        setTotalPages(responseJson.data.totalPages)
                        setIsSearch(false)
                    } else {
                        toast.error("Error getting report")
                    }
                }
            } else {
                const response = await GetAllReport(page, pageSize);
                if (response.ok) {
                    const responseJson = await response.json();
                    const data = responseJson.data.data;
                    setData(data);
                    setTotalPages(responseJson.data.totalPages)
                } else {
                    toast.error("Error getting report")
                }
            }
        }
        getAllNotification();
    }, [page, totalPages, pageSize, isUpdate, isSearch])

    return (
        <div style={{
            padding: "25px 25px 5px 25px",
            borderRadius: "10px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}>
            <Header>
                <div style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "20px" }}>
                    Danh sách báo cáo
                </div>
            </Header>
            <div style={{ marginBottom: "20px" }}>
                <TextField sx={{ marginRight: "20px" }} id="standard-basic" label="Email từ" variant="standard" value={from} onChange={(event) => setFrom(event.target.value)} />
                <TextField sx={{ marginRight: "20px" }} id="standard-basic" label="Email đến" variant="standard" value={to} onChange={(event) => setTo(event.target.value)} />
                <Button sx={{ marginTop: "15px", marginRight: "10px" }} onClick={handleFilter} variant="contained">Lọc</Button>
                <Button sx={{ marginTop: "15px" }} onClick={handleReset} variant="contained">Làm mới</Button>
            </div>
            <NotificationTable data={data} setIsUpdate={setIsUpdate} isUpdate={isUpdate} />
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
