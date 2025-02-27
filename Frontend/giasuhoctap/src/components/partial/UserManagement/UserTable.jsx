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
import FormatDate from "../../../utils/format-date";
import { useState } from "react";
import styles from "../../partial/TutorManagement/status.module.css";
import { styled } from "@mui/material/styles";
import NoDataPage from "../../global/NoDataPage";
import VisibilityIcon from '@mui/icons-material/Visibility';
import TutorDetail from "../TutorManagement/TutorDetail";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import UnbanUser from "./UnbanUser";
export default function UserTable({
  data,
  handleClickOpen,
  isUpdate,
  setIsUpdate
}) {
  const [dataDetail, setDataDetail] = useState();
  const [openDetail, setOpenDetail] = useState(false);
  const [showModalDelete, setShowmodalDelete] = useState(false);
  const [showModalUnban, setShowmodalUnban] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
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
  const TableHeader = [
    "Họ và tên",
    "Ngày sinh",
    "CCCD/CMND",
    "Điện thoại",
    "Giới tính",
    "Vai trò",
    "Trạng thái",
    "Hành động"
  ];
  const StatusType = ["Active", "Pending", "InActive", "Checking"];

  const handleClickOpenDetail = (data) => {
    setDataDetail(data)
    setOpenDetail(true);
  };

  const handleDeleteNews = async (item) => {
    setDataDelete(item);
    setShowmodalDelete(true);
  }

  const handleUnban = async (item) => {
    setDataDelete(item);
    setShowmodalUnban(true);
  }

  const handleClose = () => {
    setShowmodalDelete(false);
    setShowmodalUnban(false)
  };
  return (
    <>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {!data && <NoDataPage />}
              {
                data && data.length === 0 && (
                  <NoDataPage />
                )
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
                        sx={{ fontWeight: "600" }}
                        component="th"
                        align="left"
                        scope="row"
                      >
                        <span>{row.fullname}</span>
                      </StyledTableCell>
                      <StyledTableCell
                        style={{ fontWeight: "600" }}
                        align="left"
                      >
                        {FormatDate(row.dateOfBirth)}
                      </StyledTableCell>
                      <StyledTableCell
                        style={{ fontWeight: "600" }}
                        align="middle"
                      >
                        {row.identityNumber || "Không có"}
                      </StyledTableCell>
                      <StyledTableCell
                        style={{ fontWeight: "600" }}
                        align="left"
                      >
                        {row.phonenumber}
                      </StyledTableCell>
                      <StyledTableCell
                        style={{ fontWeight: "600" }}
                        align="left"
                      >
                        {row.gender}
                      </StyledTableCell>
                      <StyledTableCell
                        style={{ fontWeight: "600" }}
                        align="left"
                      >
                        {row.roleName}
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
                                  styleName = styles.accepted;
                                  break;
                                case "Pending":
                                  styleName = styles.pendingConfirmation;
                                  break;
                                case 'InActive':
                                  styleName = styles.rejected;
                                  break;
                                case 'Checking':
                                  styleName = styles.inProgress;
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
                      <StyledTableCell
                        style={{
                          fontWeight: "600",
                          padding: "0px",
                        }}
                        align="left"
                      >
                        <Button variant="text" sx={{ color: "black" }} onClick={() => handleClickOpenDetail(row)}>
                          <VisibilityIcon />
                        </Button>
                        {row.status == "InActive" && (
                          <Button variant="text" sx={{ color: "black" }} onClick={() => handleUnban(row)}>
                            <LockOpenIcon />
                          </Button>
                        )}
                      </StyledTableCell>
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
          dataDetail={dataDetail}
        />
      </div>
      {/* <DeleteUser
        show={showModalDelete}
        handleClose={handleClose}
        dataDelete={dataDelete}
      /> */}
      <UnbanUser
        show={showModalUnban}
        handleClose={handleClose}
        dataDelete={dataDelete}
        isUpdate={isUpdate}
        setIsUpdate={setIsUpdate}
      />
    </>
  );
}
