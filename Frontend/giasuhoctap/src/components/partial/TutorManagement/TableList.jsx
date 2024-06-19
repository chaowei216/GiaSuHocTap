import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { Navigate } from "react-router-dom";
import FormatDate from "../../../utils/format-date";
import { useEffect, useState } from "react";
import fakeDate from "../../../data/fakeData.json";
import styles from "../../partial/TutorManagement/status.module.css";
import { styled } from "@mui/material/styles";
import NoDataPage from "../../global/NoDataPage";
import GlobalLoading from "../../global/GlobalLoading";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import ClearIcon from "@mui/icons-material/Clear";
import TutorDetail from "./TutorDetail";
export default function TableList({
  data,
  handleAccept,
  handleClickOpen,
  type,
}) {
  const [openDetail, setOpenDetail] = useState(false);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const styleHeader = {
    gap: "6px",
    display: "flex",
    marginTop: "4px",
    witdh: "150px",
    justifyContent: "center",
  };
  const TableHeader = [
    "Hình ảnh",
    "Họ và tên",
    "Ngày sinh",
    "Chứng minh nhân dân",
    "Điện thoại",
    "Giới tính",
    "Trạng thái",
  ];
  const StatusType = ["Active", "Pending"];

  const handleClickOpenDetail = () => {
    setOpenDetail(true);
  };
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table" size="small">
          <TableHead style={{ backgroundColor: "#000000" }}>
            <TableRow>
              {TableHeader.map((row, index) => (
                <TableCell
                  style={{
                    color: "white",
                    alignItems: "center",
                    height: "50px",
                  }}
                  sx={{
                    "&:last-child th": {
                      textAlign: "center",
                    },
                  }}
                  align="left"
                  key={index}
                >
                  <span style={{ fontSize: "larger" }}>{row}</span>
                </TableCell>
              ))}
              {type == "Pending" && (
                <TableCell
                  style={{
                    color: "white",
                    alignItems: "center",
                    height: "50px",
                  }}
                  sx={{
                    "&:last-child th": {
                      textAlign: "center",
                    },
                  }}
                  align="left"
                >
                  <span style={{ fontSize: "larger" }}>Hành động</span>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {!data && <NoDataPage />}
            {
              data && data.length === 0 && (
                <StyledTableCell
                  sx={{ fontWeight: "600", width: "220px" }}
                  component="th"
                  align="left"
                  scope="row"
                >
                  <Button
                    sx={{ paddingLeft: "0px", textTransform: "none" }}
                    onClick={handleClickOpenDetail}
                  >
                    <span>Test</span>
                  </Button>
                </StyledTableCell>
              )
              /* <NoDataPage />*/
            }
            {data &&
              data.map((row, index) => {
                return (
                  <StyledTableRow
                    style={{ textAlign: "center", height: "60px" }}
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell
                      style={{ fontWeight: "600", width: "100px" }}
                      component="th"
                      scope="row"
                    >
                      Ảnh
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{ fontWeight: "600", width: "220px" }}
                      component="th"
                      align="left"
                      scope="row"
                    >
                      <Button
                        sx={{ paddingLeft: "0px", textTransform: "none" }}
                        // onClick={() => Navigate(`/class-detail/${row.classId}`)}
                      >
                        <span>{row.fullname}</span>
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ fontWeight: "600", width: "200px" }}
                      align="left"
                    >
                      {FormatDate(row.dateOfBirth)}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ fontWeight: "600", width: "200px" }}
                      align="middle"
                    >
                      {row.identityNumber}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ fontWeight: "600", width: "170px" }}
                      align="left"
                    >
                      {row.phonenumber}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ fontWeight: "600", width: "140px" }}
                      align="left"
                    >
                      {row.gender}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{
                        width: "150px",
                        paddingLeft: "0px",
                        paddingRight: "20px",
                      }}
                      style={{ fontWeight: "600" }}
                      align="left"
                    >
                      {StatusType &&
                        StatusType.map((type, index) => {
                          if (row.status == type) {
                            let styleName;
                            switch (type) {
                              case "Active":
                                styleName = styles.active;
                                break;
                              case "Pending":
                                styleName = styles.pending;
                                break;
                              default:
                                styleName = "";
                            }
                            return (
                              <div className={styleName} key={index}>
                                {type}
                              </div>
                            );
                          }
                        })}
                    </StyledTableCell>
                    {type == "Pending" && (
                      <StyledTableCell
                        style={{
                          fontWeight: "600",
                          width: "270px",
                          padding: "0px",
                        }}
                        align="left"
                      >
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleAccept(row.email)}
                          sx={{
                            background: "#0b7234",
                            color: "white",
                            marginRight: "15px",
                          }}
                        >
                          <DoneOutlineIcon /> Accept
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleClickOpen(row.email)}
                          sx={{ background: "#de3a3b", color: "white" }}
                        >
                          <div>
                            <ClearIcon /> Deny
                          </div>
                        </Button>
                      </StyledTableCell>
                    )}
                    {/* <TableCell align="center">
                                            <Action
                                                setOpen={setOpen}
                                                row={row}
                                                setA={setA}
                                                setData={setData}
                                                rerender={rerender}
                                            />
                                        </TableCell> */}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TutorDetail
        openDetail={openDetail}
        handleClickOpenDetail={handleClickOpenDetail}
        setOpenDetail={setOpenDetail}
      />
    </div>
  );
}
