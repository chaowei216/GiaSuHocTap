import React, { useState, useEffect } from "react";
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from "mdb-react-ui-kit";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import WarningIcon from '@mui/icons-material/Warning';
import useAuth from "../../../hooks/useAuth";
import { AcceptOrDenyRequestOnline } from "../../../api/RequestApi";
export default function DenyTeach(pros) {
    const { user } = useAuth()
    const { show, handleClose, data, setIsUpdated, isUpdated, setIsModalOpen } = pros;
    const handleDeny = async () => {
        console.log(data);
        if (user && data) {
            const dataUpdate = {
                tutorId: user?.userId,
                requestId: data,
                isAccepted: false,
                linkMeet: ""
            }
            setIsModalOpen(true)
            const response = await AcceptOrDenyRequestOnline(dataUpdate)
            if (response.ok) {
                const responseJson = await response.json();
                if (responseJson.statusCode == 200) {
                    setIsUpdated(!isUpdated)
                    setIsModalOpen(false)
                    toast.success("Từ chối thành công")
                    handleClose()
                }
            } else {
                setIsModalOpen(false)
                toast.error("Lỗi server")
            }
        }
    }

    return (
        <>
            <MDBModal open={show} tabIndex="-1" onClose={handleClose}>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader
                            className="modal-header d-flex "
                            style={{ background: "white" }}
                        >
                            <MDBModalTitle className="text-xl" style={{ textAlign: "left", color: "#3295cf" }}>
                                <WarningIcon color="primary" fontSize="large" sx={{ marginRight: "10px" }} /> Từ chối ?
                            </MDBModalTitle>
                        </MDBModalHeader>
                        <MDBModalBody style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                            <div className="form-content">
                                <div style={{ fontSize: "large", color: "#a1a1a1" }}>
                                    Bạn có chắc muốn từ chối người này không
                                </div>
                            </div>
                            <div style={{ display: "flex", marginTop: "20px" }}>
                                <div>
                                    <Button
                                        variant="primary"
                                        onClick={handleClose}
                                        active
                                        class="btn btn-danger"
                                        style={{ width: "100px", marginRight: "20px", background: "#ffffff", color: "#a3a3a3", border: "1px solid #dfdfdf" }}
                                    >
                                        Đóng
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        color="error"
                                        variant="primary"
                                        class="btn btn-outline-danger"
                                        type="submit"
                                        style={{ background: "#f74747", width: "100px", color: "white" }}
                                        onClick={handleDeny}
                                        data-mdb-dismiss="modal"
                                        active
                                    >
                                        Từ chối
                                    </Button>
                                </div>
                            </div>
                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}