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
export default function DenyTeach(pros) {
    const { show, handleClose } = pros;
    const handleDeleteNews = async () => {
        // try {
        //   const id = newsId;
        //   const response = await fetch(`https://localhost:44352/api/News/${id}`, {
        //     method: "DELETE",
        //   });
        //   if (response.ok) {
        //     console.log("Success");
        //     window.location.reload();
        //   } else {
        //     toast.error("Error deleting");
        //   }
        // } catch (error) {
        //   console.log(error);
        // }
    };

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
                                <WarningIcon color="primary" fontSize="large" sx={{ marginRight: "10px" }} /> Deny Request ?
                            </MDBModalTitle>
                        </MDBModalHeader>
                        <MDBModalBody style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                            <div className="form-content">
                                <div style={{ fontSize: "large", color: "#a1a1a1" }}>
                                    Are you sure want to deny this request
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
                                        Close
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        color="error"
                                        variant="primary"
                                        class="btn btn-outline-danger"
                                        type="submit"
                                        style={{ background: "#f74747", width: "100px", color: "white" }}
                                        onClick={handleDeleteNews}
                                        data-mdb-dismiss="modal"
                                        active
                                    >
                                        Deny
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