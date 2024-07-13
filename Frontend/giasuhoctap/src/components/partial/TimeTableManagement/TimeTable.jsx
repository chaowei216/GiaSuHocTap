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
import { useState } from "react";
import styles from "../../partial/TutorManagement/status.module.css";
import { styled } from "@mui/material/styles";
import NoDataPage from "../../global/NoDataPage";
import GlobalLoading from "../../global/GlobalLoading";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BlockIcon from '@mui/icons-material/Block';
import LockOpenIcon from '@mui/icons-material/LockOpen';

export default function TimeTable({
  data, handleClickUpdate, handleClickDelete, handleActive
}) {
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
    "Ngày trong tuần",
    "Từ",
    "Đến",
    "Buổi",
    "Kiểu",
    "Trạng thái",
    "Hành động",
  ];
  const StatusType = ["Đã hủy", "Rảnh", "Bận"];

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" size="small">
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
            {data && data.length === 0 && <NoDataPage />}
            {data &&
              data.map((row, index) => {
                return (
                  <StyledTableRow
                    style={{ textAlign: "center", height: "60px" }}
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell
                      style={{ fontWeight: "600" }}
                      component="th"
                      scope="row"
                    >
                      {row.dayOfWeek}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ fontWeight: "600" }}
                      align="left"
                    >
                      {row.startTime}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ fontWeight: "600" }}
                      align="left"
                    >
                      {row.endTime}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ fontWeight: "600" }}
                      align="left"
                    >
                      {row.period}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ fontWeight: "600" }}
                      align="left"
                    >
                      {row.learningType}
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
                              case "Rảnh":
                                styleName = styles.completed;
                                break;
                              case "Đã hủy":
                                styleName = styles.rejected;
                                break;
                              case "Bận":
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
                      style={{ fontWeight: "600" }}
                      align="left"
                    >
                      <Button variant="text" sx={{ color: "black" }} onClick={() => handleClickUpdate(row)}>
                        <EditIcon />
                      </Button>
                      {row.status == "Rảnh" && (
                        <Button variant="text" sx={{ color: "black" }} onClick={() => handleClickDelete(row.timeTableId)}>
                          <BlockIcon />
                        </Button>
                      )}
                      {row.status == "Đã hủy" && (
                        <Button variant="text" sx={{ color: "black" }} onClick={() => handleActive(row.timeTableId)}>
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
    </div>
  );
}
