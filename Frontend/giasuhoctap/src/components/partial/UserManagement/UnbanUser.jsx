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
import { UnblockUser } from "../../../api/UserApi";

export default function UnbanUser(pros) {
  const { show, handleClose, dataDelete, isUpdate, setIsUpdate } = pros;
  const [userId, setUserId] = useState("");
  const [newsTitle, setNewsTitle] = useState("");
  useEffect(() => {
    if (show) {
      setUserId(dataDelete.userId);
      setNewsTitle(dataDelete.fullname);
    }
  }, [dataDelete]);
  const handleDeleteNews = async () => {
    const response = await UnblockUser(userId);
    if (response.status == 204) {
      toast.success("Mở khóa thành công")
      setIsUpdate(!isUpdate)
      handleClose()
    } else {
      toast.error("Lỗi sever")
    }
  };

  return (
    <>
      <MDBModal staticBackdrop tabIndex="-1" open={show} onHide={handleClose}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader
              className="modal-header text-white d-flex justify-content-center"
              style={{ background: "#DC4C64" }}
            >
              <MDBModalTitle className="text-xl" style={{ textAlign: "center" }}>
                Bạn có muốn gỡ cấm cho tài khoản này
              </MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody style={{ height: "90px", display: "flex", alignItems: "center" }}>
              <div className="form-content">
                <div style={{ fontSize: "large", fontWeight: "bolder" }}>
                  Mở khóa tài khoản: {" " + newsTitle}{" "}
                </div>
              </div>
            </MDBModalBody>
            <MDBModalFooter tag="section">
              <div>
                <Button
                  variant="primary"
                  class="btn btn-outline-danger"
                  type="submit"
                  onClick={handleDeleteNews}
                  data-mdb-dismiss="modal"
                  style={{
                    marginRight: "20px",
                  }}
                  active
                >
                  Mở khóa
                </Button>
              </div>
              <div
                style={{
                  background: "gainsboro",
                }}
              >
                <Button
                  variant="secondary"
                  onClick={handleClose}
                  active
                  class="btn btn-danger"
                  style={{ width: "80px" }}
                >
                  Đóng
                </Button>
              </div>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}