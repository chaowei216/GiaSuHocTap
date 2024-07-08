import React, { useEffect, useState } from 'react'
import Header from '../TutorManagement/Header'
import data from "../../../data/fakeData.json"
import RequestTable from './TransactionTable';
import PageNavigation from '../TutorManagement/PageNavigation';
import PageSize from '../TutorManagement/PageSize';
export default function ViewTransactionByUser() {
    const [totalPages, setTotalPages] = useState();
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(5);
    const [test, setTest] = useState();
    const [parent, setParent] = useState({});
    const [showModalDelete, setShowmodalDelete] = useState(false);
    const handleClose = () => {
        setShowmodalDelete(false);
    };
    useEffect(() => {
        setTest(data)
    }, [])
    const [basicModal, setBasicModal] = useState(false);
    const handleHire = (item) => {
        setParent(item);
        setBasicModal(true);
        console.log(item);
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
                <div style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "30px" }}>
                    Lịch sử giao dịch của all user
                </div>
            </Header>
            <RequestTable data={test} handleHire={handleHire} handleOpenDeny={handleOpenDeny} />
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
                                totalPages={5}
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
