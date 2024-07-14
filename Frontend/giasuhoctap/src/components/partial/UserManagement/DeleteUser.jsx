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

export default function DeleteUser(pros) {
  const { show, handleClose, dataDelete } = pros;

  const [newsId, setNewsId] = useState("");
  const [newsTitle, setNewsTitle] = useState("");
  useEffect(() => {
    if (show) {
      //   setNewsId(dataDelete.newsId);
      setNewsTitle(dataDelete.fullname);
    }
  }, [dataDelete]);
  const handleSave = () => {
    console.log("haha");
  };
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
      <MDBModal staticBackdrop tabIndex="-1" open={show} onHide={handleClose}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader
              className="modal-header text-white d-flex justify-content-center"
              style={{ background: "#DC4C64" }}
            >
              <MDBModalTitle className="text-xl" style={{ textAlign: "center" }}>
                Do you want to delete this user
              </MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody style={{ height: "90px", display: "flex", alignItems: "center" }}>
              <div className="form-content">
                <div style={{ fontSize: "large", fontWeight: "bolder" }}>
                  Delete User: {" " + newsTitle}{" "}
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
                  Xóa
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