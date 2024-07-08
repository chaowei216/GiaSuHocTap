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
import DeleteIcon from '@mui/icons-material/Delete';

export default function FeedbackTable({
  data, handleClickUpdate, handleClickDelete
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
    "ID",
    "Mô tả",
    "Loại",
    "Ngày tạo",
    "Trạng thái",
    "Hành động",
  ];
  const StatusType = [false, true];

  const handleDeleteNews = async (item) => {
    setDataDelete(item);
    setShowmodalDelete(true);
  }
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
                      {row.notificationId}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ fontWeight: "600" }}
                      align="left"
                    >
                      {row.description}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ fontWeight: "600" }}
                      align="middle"
                    >
                      {row.notificationType}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ fontWeight: "600" }}
                      align="left"
                    >
                      {row.createdTime?.split("T")[0]}
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
                              case true:
                                styleName = styles.completed;
                                break;
                              case false:
                                styleName = styles.rejected;
                                break;
                              default:
                                styleName = "";
                            }
                            return (
                              <div className={styleName} key={index}>
                                {type ? "True" : "False"}
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
                      <Button variant="text" sx={{ color: "black" }} onClick={() => handleClickDelete(row)}>
                        <DeleteIcon />
                      </Button>
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
