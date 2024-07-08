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
import { styled } from "@mui/material/styles";
import NoDataPage from "../../global/NoDataPage";
import styles from "../../partial/TutorManagement/status.module.css";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import ClearIcon from "@mui/icons-material/Clear";
import { toast } from "react-toastify";
import { AcceptOrDenyReport } from "../../../api/ReportApi";
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
export default function ReportTable(pros) {
  const { data, setIsUpdate, isUpdate } = pros
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
  const TableHeader = ["Tiêu đề", "Mô tả", "Ngày tạo", "Phụ huynh", "Gia sư", "Trạng thái", "Hành động"];
  const StatusType = ["Đang chờ xử lý", "Đã xử lý"]
  const handleAccept = async (requestId) => {
    const dataUpdate = {
      reportId: requestId,
      isAccepted: true
    }
    const response = await AcceptOrDenyReport(requestId, dataUpdate)
    if (response.ok) {
      const responseJson = await response.json();
      if (responseJson.statusCode == 204) {
        setIsUpdate(!isUpdate)
        toast.success("Chấp nhận thành công")
      }
    } else {
      toast.error("Error accepting")
    }
  };
  const handleDeny = async (requestId) => {
    const dataUpdate = {
      reportId: requestId,
      isAccepted: false
    }
    const response = await AcceptOrDenyReport(dataUpdate)
    if (response.ok) {
      const responseJson = await response.json();
      if (responseJson.statusCode == 204) {
        setIsUpdate(!isUpdate)
        toast.success("Từ chối thành công")
      }
    } else {
      toast.error("Error deny")
    }
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
                    <StyledTableCell style={{ fontWeight: "600" }} align="left">
                      {row.reportTitle}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ fontWeight: "600" }}
                      align="middle"
                    >
                      {row.description}
                    </StyledTableCell>
                    <StyledTableCell style={{ fontWeight: "600" }} align="left">
                      {row.createdDate.split("T")[0]}
                    </StyledTableCell>
                    <StyledTableCell style={{ fontWeight: "600" }} align="left">
                      {row.parentsEmail}
                    </StyledTableCell>
                    <StyledTableCell style={{ fontWeight: "600" }} align="left">
                      {row.tutorEmail}
                    </StyledTableCell>
                    <StyledTableCell style={{ fontWeight: "600" }} align="left">
                      {StatusType &&
                        StatusType.map((type, index) => {
                          if (row.status == type) {
                            let styleName;
                            switch (type) {
                              case "Đang chờ xử lý":
                                styleName = styles.pendingConfirmation;
                                break;
                              case "Đã xử lý":
                                styleName = styles.completed;
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
                    {row.status == "Đang chờ xử lý" && (
                      <StyledTableCell
                        style={{
                          fontWeight: "600",
                          padding: "0px",
                        }}
                        align="left"
                      >
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleAccept(row.reportId)}
                          sx={{
                            background: "#0b7234",
                            color: "white",
                            borderRadius: "18px",
                            marginRight: "15px",
                            fontSize: "12px"
                          }}
                        >
                          <DoneOutlineIcon /> Accept
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => handleDeny(row.reportId)}
                          color="error"
                          sx={{ background: "#de473a", color: "white", borderRadius: "18px", fontSize: "12px" }}
                        >
                          <div>
                            <ClearIcon /> Deny
                          </div>
                        </Button>
                      </StyledTableCell>
                    )}
                    {row.status == "Đã xử lý" && (
                      <StyledTableCell style={{ fontWeight: "600" }} align="left">
                        <DoNotDisturbIcon /> Không có gì
                      </StyledTableCell>
                    )}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
