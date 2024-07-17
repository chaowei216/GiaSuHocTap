import React, { useEffect, useState } from 'react'
import Header from '../TutorManagement/Header'
import TransactionTable from './TransactionTable';
import PageNavigation from '../TutorManagement/PageNavigation';
import PageSize from '../TutorManagement/PageSize';
import { GetAllTransaction, GetTransactionByStatus } from '../../../api/TransactionApi';
import { toast } from 'react-toastify';
import WaitingModal from '../../global/WaitingModal';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
export default function ViewTransaction() {
    const [totalPages, setTotalPages] = useState();
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(5);
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [statusTransaction, setStatusTransaction] = useState("");
    const [isSearch, setIsSearch] = useState(false)
    useEffect(() => {
        const getAllTrans = async () => {
            if (isSearch) {
                if ((statusTransaction) != "") {
                    const response = await GetTransactionByStatus(statusTransaction, page, pageSize);
                    if (response.ok) {
                        const responseJson = await response.json();
                        const user = responseJson.data.data
                        setData(user);
                        setTotalPages(responseJson.data.totalPages)
                        setIsSearch(true)
                    } else {
                        toast.error("Lỗi server")
                    }
                } else {
                    const response = await GetAllTransaction(page, pageSize);
                    if (response.ok) {
                        const responseJson = await response.json();
                        const user = responseJson.data.data
                        setData(user);
                        setTotalPages(responseJson.data.totalPages)
                        setIsSearch(false)
                    } else {
                        toast.error("Lỗi server")
                    }
                }
            } else {
                const response = await GetAllTransaction(page, pageSize);
                if (response.ok) {
                    const responseJson = await response.json();
                    const data = responseJson.data.data;
                    setData(data);
                    setTotalPages(responseJson.data.totalPages)
                } else {
                    toast.error("Lỗi server")
                }
            }
        }
        getAllTrans();
    }, [page, totalPages, pageSize, isSearch])

    const handleFilter = async () => {
        setPage(1)
        if ((statusTransaction) != "") {
            const response = await GetTransactionByStatus(statusTransaction, page, pageSize);
            if (response.ok) {
                const responseJson = await response.json();
                const user = responseJson.data.data
                setData(user);
                setTotalPages(responseJson.data.totalPages)
                setIsSearch(true)
            } else {
                toast.error("Lỗi server")
            }
        } else {
            setIsSearch(false)
        }
    }

    const handleReset = async () => {
        setPage(1)
        setStatusTransaction("")
        const response = await GetAllTransaction(page, pageSize);
        if (response.ok) {
            const responseJson = await response.json();
            const user = responseJson.data.data
            setData(user);
            setTotalPages(responseJson.data.totalPages)
            setIsSearch(false)
        } else {
            toast.error("Lỗi server")
        }
    }
    return (
        <div style={{
            padding: "25px 25px 5px 25px",
            borderRadius: "10px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}>
            <Header>
                <div style={{ fontSize: "30px", fontWeight: "bold" }}>
                    Lịch sử giao dịch của tất cả người dùng
                </div>
            </Header>
            <div style={{ marginTop: "5px", marginBottom: "25px" }}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Trạng thái</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={statusTransaction}
                        onChange={(event) => setStatusTransaction(event.target.value)}
                        label="Trạng thái"
                    >
                        <MenuItem value="Paid">
                            <p>Paid</p>
                        </MenuItem>
                        <MenuItem value="Pending">
                            <p>Pending</p>
                        </MenuItem>
                    </Select>
                </FormControl>
                <Button sx={{ marginTop: "20px", marginRight: "10px" }} onClick={handleFilter} variant="contained">Tìm</Button>
                <Button sx={{ marginTop: "20px" }} onClick={handleReset} variant="contained">Làm mới</Button>
            </div>
            <TransactionTable data={data} />
            <WaitingModal open={false} setOpen={setIsModalOpen} />
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
