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
}) {
  const handleClose = () => {
    setOpenDetail(false);
  };

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
          Thông tin chi tiết gia sư
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
                  src={Messi}
                  alt="project-image"
                  className="rounded"
                />
              </div>
            </div>
            <div className="project-info-box w-2/3">
              <p>
                <b>Họ và tên:</b> Phạm Văn Quyệt
              </p>
              <hr />
              <p>
                <b>Năm sinh:</b> 01/01/1960
              </p>
              <hr />
              <p>
                <b>Địa chỉ</b> 32, đường 23, Phú hữu, Quận 9
              </p>
              <hr />
              <p>
                <b>Hiện là:</b> Sinh viên
              </p>
              <hr />
              <p className="mb-0">
                <b>Chuyên ngành:</b> Công nghệ thông tin
              </p>
            </div>
          </div>
          <Typography gutterBottom className="mt-4">
            <b>Nhận dạy:</b> Lớp 6, Lớp 7, Lớp 8, Lớp 9, Lớp 10, Lớp 11, Lớp 12,
            Ôn Thi Đại Học
          </Typography>
          <Typography gutterBottom className="mt-3">
            <b>Các môn:</b> Toán, Lý, Hóa
          </Typography>
          <Typography gutterBottom className="mt-3">
            <b>Hình chứng minh nhân dân</b>
          </Typography>
          <div className="flex mt-3" style={{ justifyContent: "center" }}>
            <div className="col-md-7" style={{ width: "40%" }}>
              <img
                style={{ width: "90%" }}
                src={cmnd2}
                alt="project-image"
                className="rounded"
              />
            </div>
            <div className="col-md-7" style={{ width: "40%" }}>
              <img
                style={{ width: "90%" }}
                src={cmnd1}
                alt="project-image"
                className="rounded"
              />
            </div>
          </div>
          <Typography gutterBottom className="mt-3">
            <b>Hình chứng chỉ bằng cấp</b>
          </Typography>
          <div
            className="flex mt-3"
            style={{ flexWrap: "wrap", justifyContent: "center" }}
          >
            <div className="col-md-7" style={{ width: "40%" }}>
              <img
                style={{ width: "90%" }}
                src={cmnd2}
                alt="project-image"
                className="rounded"
              />
            </div>
            <div className="col-md-7" style={{ width: "40%" }}>
              <img
                style={{ width: "90%" }}
                src={cmnd1}
                alt="project-image"
                className="rounded"
              />
            </div>
            <div className="col-md-7" style={{ width: "40%" }}>
              <img
                style={{ width: "90%" }}
                src={cmnd1}
                alt="project-image"
                className="rounded mt-3"
              />
            </div>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
