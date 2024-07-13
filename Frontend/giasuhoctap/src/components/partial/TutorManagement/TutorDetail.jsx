import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from '@mui/material';
import emptyPicture from "/img/empty.png";
import NoDataPage from "../../global/NoDataPage";

const baseUrl = import.meta.env.VITE_API_HOST;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const dayOrder = {
  "Monday": 1,
  "Tuesday": 2,
  "Wednesday": 3,
  "Thursday": 4,
  "Friday": 5,
  "Saturday": 6,
  "Sunday": 7
};

const periodOrder = {
  "Morning": 1,
  "Afternoon": 2,
  "Evening": 3
};

const learningTypeOrder = {
  "Online": 1,
  "Offline": 2
};

const groupTimeTables = (timeTables) => {
  const grouped = {};

  timeTables.forEach((time) => {
    const key = `${time.dayOfWeek}-${time.period}-${time.learningType}`;

    if (!grouped[key]) {
      grouped[key] = {
        dayOfWeek: time.dayOfWeek,
        period: time.period,
        learningType: time.learningType,
        startTime: time.startTime,
        endTime: time.endTime
      };
    } else {
      grouped[key].endTime = time.endTime;
    }
  });

  return Object.values(grouped).sort((a, b) => {
    const dayComparison = dayOrder[a.dayOfWeek] - dayOrder[b.dayOfWeek];
    if (dayComparison !== 0) return dayComparison;

    const periodComparison = periodOrder[a.period] - periodOrder[b.period];
    if (periodComparison !== 0) return periodComparison;

    const startTimeComparison = a.startTime.localeCompare(b.startTime);
    if (startTimeComparison !== 0) return startTimeComparison;

    return learningTypeOrder[a.learningType] - learningTypeOrder[b.learningType];
  });
};

export default function TutorDetail({
  openDetail,
  handleClickOpenDetail,
  setOpenDetail,
  dataDetail
}) {
  const handleClose = () => {
    setOpenDetail(false);
  };
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const groupedTimeTables = groupTimeTables(dataDetail?.timeTables || []);
  const paginatedTimeTables = groupedTimeTables.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const translateDayOfWeek = (dayOfWeek) => {
    const daysInVietnamese = {
      Monday: 'Thứ 2',
      Tuesday: 'Thứ 3',
      Wednesday: 'Thứ 4',
      Thursday: 'Thứ 5',
      Friday: 'Thứ 6',
      Saturday: 'Thứ 7',
    };
    return daysInVietnamese[dayOfWeek] || dayOfWeek;
  };
  const translatePeriod = (dayOfWeek) => {
    const daysInVietnamese = {
      Morning: 'Buổi sáng',
      Afternoon: 'Buổi chiều ',
      Evening: 'Buổi tối',
    };
    return daysInVietnamese[dayOfWeek] || dayOfWeek;
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
                <b>Địa chỉ:</b> {dataDetail?.address}
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
                  alt="Nothing"
                  onError={(e) => {
                    e.currentTarget.src = emptyPicture;
                  }}
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
          <Typography gutterBottom className="mt-3">
            <b>Thời khóa biểu</b>
          </Typography>
          <TableContainer component={Paper} className="mt-3">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Ngày</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Buổi</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Giờ bắt đầu</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Giờ kết thúc</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Loại hình học</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedTimeTables && paginatedTimeTables.length <= 0 && (
                  <NoDataPage />
                )}
                {paginatedTimeTables && paginatedTimeTables.map((time, index) => (
                  <TableRow key={index}>
                    <TableCell>{translateDayOfWeek(time.dayOfWeek)}</TableCell>
                    <TableCell>{translatePeriod(time.period)}</TableCell>
                    <TableCell>{time.startTime}</TableCell>
                    <TableCell>{time.endTime}</TableCell>
                    <TableCell>{time.learningType}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {paginatedTimeTables && paginatedTimeTables.length > 0 && (
            <Pagination
              count={Math.ceil(groupedTimeTables.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              className="flex justify-center mt-4"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Đóng
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
