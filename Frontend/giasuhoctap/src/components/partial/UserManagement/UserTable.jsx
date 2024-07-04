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
import DeleteIcon from '@mui/icons-material/Delete';
import FormatDate from "../../../utils/format-date";
import { useEffect, useState } from "react";
import fakeDate from "../../../data/fakeData.json";
import styles from "../../partial/TutorManagement/status.module.css";
import { styled } from "@mui/material/styles";
import NoDataPage from "../../global/NoDataPage";
import GlobalLoading from "../../global/GlobalLoading";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TutorDetail from "../TutorManagement/TutorDetail";
import DeleteUser from "./DeleteUser";
export default function UserTable({
  data,
  handleClickOpen,
}) {
  const [dataDetail, setDataDetail] = useState();
  const [openDetail, setOpenDetail] = useState(false);
  const [showModalDelete, setShowmodalDelete] = useState(false);
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
    "Trạng thái",
    "Hành động"
  ];
  const StatusType = ["Active", "Pending"];

  const handleClickOpenDetail = (data) => {
    setDataDetail(data)
    setOpenDetail(true);
  };

  const handleDeleteNews = async (item) => {
    setDataDelete(item);
    console.log("aa");
    setShowmodalDelete(true);
  }

  const handleClose = () => {
    setShowmodalDelete(false);
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
                        {row.identityNumber}
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
                        <Button variant="text" sx={{ color: "black" }} onClick={() => handleClickOpenDetail(row)}>
                          <EditIcon />
                        </Button>
                        <Button variant="text" sx={{ color: "black" }} onClick={() => handleDeleteNews(row)}>
                          <DeleteIcon />
                        </Button>
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
      <DeleteUser
        show={showModalDelete}
        handleClose={handleClose}
        dataDelete={dataDelete}
      />
    </>
  );
}
