import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Messi from "/img/avatarMessi.png";
import cmnd1 from "/img/cmnd1.jpg";
import cmnd2 from "/img/cmnd2.webp";
import WaitingModal from "../../global/WaitingModal";
import emptyPicture from "/img/empty.png"
const baseUrl = import.meta.env.VITE_API_HOST;
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
export default function TutorDetail({
  openDetail,
  handleClickOpenDetail,
  setOpenDetail,
  dataDetail
}) {
  const handleClose = () => {
    setOpenDetail(false);
  };
  console.log(dataDetail);
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        maxWidth="md"
        open={openDetail}
        fullWidth="500px"
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "x-large",
            backgroundColor: "burlywood"
          }}
          id="customized-dialog-title"
        >
          Thông tin chi tiết user
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div className="flex">
            <div className="w-1/3">
              <div className="col-md-7" style={{ width: "100%" }}>
                <img
                  style={{ width: "90%", height: "250px" }}
                  src={`${baseUrl}/api/Auth/user-image?fileName=${dataDetail?.userImage}`}
                  onError={(e) => {
                    e.currentTarget.src = emptyPicture;
                  }}
                  alt="project-image"
                  className="rounded"
                />
              </div>
            </div>
            <div className="project-info-box w-2/3">
              <p style={{ height: "40px" }}>
                <b>Mã số:</b> {dataDetail?.userId}
              </p>
              <hr />
              <p style={{ height: "40px", marginTop: "15px" }}>
                <b>Họ và tên:</b> {dataDetail?.fullname}
              </p>
              <hr />
              <p style={{ height: "40px", marginTop: "15px" }}>
                <b>Năm sinh:</b> {dataDetail?.dateOfBirth}
              </p>
              <hr />
              <p style={{ height: "40px", marginTop: "15px" }}>
                <b>Địa chỉ</b> {dataDetail?.address}
              </p>
              <hr />
              <p style={{ height: "40px", marginTop: "15px" }} className="mb-0">
                <b>Chuyên ngành:</b> Công nghệ thông tin
              </p>
            </div>
          </div>
          <Typography gutterBottom className="mt-3">
            <b>Số điện thoại:</b> {dataDetail?.phonenumber}
          </Typography>
          <Typography gutterBottom className="mt-3">
            <b>Chứng minh nhân dân:</b> {dataDetail?.identityNumber}
          </Typography>
          <Typography gutterBottom className="mt-3">
            <b>Hình chứng minh nhân dân</b>
          </Typography>
          <div className="flex mt-3" style={{ justifyContent: "center", flexWrap: "wrap", }}>
            {dataDetail?.identityImage.map((fileName, index) => (
              <div key={index} className="col-md-7" style={{ width: "40%" }}>
                <img
                  style={{ width: "90%", height: "230px" }}
                  src={`${baseUrl}/api/Auth/user-image?fileName=${fileName}`}
                  onError={(e) => {
                    e.currentTarget.src = emptyPicture;
                  }}
                  alt="project-image"
                  className="rounded"
                />
              </div>
            ))}
            {(dataDetail == undefined || dataDetail?.identityImage.length == 0) && (
              <div className="col-md-7" style={{ width: "40%" }}>
                <img
                  style={{ width: "90%", height: "200px" }}
                  src={emptyPicture}
                  alt="project-image"
                  className="rounded"
                />
              </div>
            )}
          </div>
          <Typography gutterBottom className="mt-3">
            <b>Hình chứng chỉ bằng cấp</b>
          </Typography>
          <div
            className="flex mt-3"
            style={{ flexWrap: "wrap", justifyContent: "center" }}
          >
            {dataDetail?.tutorDetail?.certificateImage.map((fileName, index) => (
              <div key={index} className="col-md-7" style={{ width: "40%" }}>
                <img
                  style={{ width: "90%", height: "230px" }}
                  src={`${baseUrl}/api/Auth/user-image?fileName=${fileName}`}
                  onError={(e) => {
                    e.currentTarget.src = emptyPicture;
                  }}
                  alt="project-image"
                  className="rounded"
                />
              </div>
            ))}
            {(dataDetail?.tutorDetail == undefined || dataDetail?.tutorDetail?.certificateImage.length == 0) && (
              <div className="col-md-7" style={{ width: "40%" }}>
                <img
                  style={{ width: "90%", height: "200px" }}
                  src={emptyPicture}
                  alt="project-image"
                  className="rounded"
                />
              </div>
            )}
          </div>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
