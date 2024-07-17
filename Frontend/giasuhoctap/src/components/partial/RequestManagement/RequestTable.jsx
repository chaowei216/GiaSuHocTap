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
import styles from "../../partial/TutorManagement/status.module.css";
import { styled } from "@mui/material/styles";
import NoDataPage from "../../global/NoDataPage";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import ClearIcon from "@mui/icons-material/Clear";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { AcceptOrDenyRequestOFfline } from "../../../api/RequestApi";
import ExpandContent from "../../global/ExpandContent";
export default function RequestTable({
  data,
  setIsUpdated,
  isUpdated,
  type,
  setIsModalOpen
}) {
  const { user } = useAuth()
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
    "Người yêu cầu",
    "Địa điểm",
    "Lương",
    "Mô tả",
    "Lớp",
    "Môn",
    "Trạng thái",
    "Hành động",
  ];
  const StatusType = ["Chờ xác nhận", "Đang tiến hành", "Hoàn thành", "Từ chối", "Đã chấp nhận"];

  const handleAccept = async (requestId) => {
    if (user) {
      const dataUpdate = {
        tutorId: user?.userId,
        requestId: requestId,
        isAccepted: true,
        // linkMeet: "",
      }
      setIsModalOpen(true);
      const response = await AcceptOrDenyRequestOFfline(dataUpdate)
      if (response.ok) {
        const responseJson = await response.json();
        if (responseJson.statusCode == 200) {
          setIsUpdated(!isUpdated)
          setIsModalOpen(false)
          toast.success("Chấp nhận thành công")
        }
      } else {
        setIsModalOpen(false)
        toast.error("Lỗi server")
      }
    }
  };
  const handleDeny = async (requestId) => {
    if (user) {
      const dataUpdate = {
        tutorId: user?.userId,
        requestId: requestId,
        isAccepted: false,
        // linkMeet: "",
      }
      setIsModalOpen(true);
      const response = await AcceptOrDenyRequestOFfline(dataUpdate)
      if (response.ok) {
        const responseJson = await response.json();
        if (responseJson.statusCode == 200) {
          setIsUpdated(!isUpdated)
          setIsModalOpen(false);
          toast.success("Chấp nhận thành công")
        }
      } else {
        setIsModalOpen(false);
        toast.error("Lỗi server")
      }
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
                    <StyledTableCell
                      style={{ fontWeight: "600" }}
                      component="th"
                      scope="row"
                    >
                      {row.requestUserName}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{ fontWeight: "600" }}
                      component="th"
                      align="left"
                      scope="row"
                    >
                      <span>{row.location}</span>
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ fontWeight: "600" }}
                      align="left"
                    >
                      {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.price)}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ fontWeight: "600", width: "150px" }}
                      align="middle"
                    >
                      <ExpandContent description={row.description} numberLength={20} />
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ fontWeight: "600" }}
                      align="left"
                    >
                      {row.className}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ fontWeight: "600" }}
                      align="left"
                    >
                      {row.courseName}
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
                          if (row.requestStatus == type) {
                            let styleName;
                            switch (type) {
                              case "Chờ xác nhận":
                                styleName = styles.pendingConfirmation;
                                break;
                              case "Đang tiến hành":
                                styleName = styles.inProgress;
                                break;
                              case "Hoàn thành":
                                styleName = styles.completed;
                                break;
                              case "Từ chối":
                                styleName = styles.rejected;
                                break;
                              case "Đã chấp nhận":
                                styleName = styles.accepted;
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
                    {(type == "All" || type == "Done" || type == "Deny") && (
                      <StyledTableCell
                        style={{ fontWeight: "600" }}
                        align="left"
                      >
                        Không có gì
                      </StyledTableCell>
                    )}
                    {type == "Pending" && (
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
                          onClick={() => handleAccept(row.requestId)}
                          sx={{
                            background: "#0b7234",
                            color: "white",
                            borderRadius: "18px",
                            marginRight: "15px",
                            fontSize: "12px"
                          }}
                        >
                          <DoneOutlineIcon /> Chấp nhận
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => handleDeny(row.requestId)}
                          color="error"
                          sx={{ background: "#de473a", color: "white", borderRadius: "18px", fontSize: "12px" }}
                        >
                          <div>
                            <ClearIcon /> Từ chối
                          </div>
                        </Button>
                      </StyledTableCell>
                    )}
                    {type == "Teaching" && (
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
                          onClick={() => handleAccept(row.requestId)}
                          sx={{
                            background: "#0b7234",
                            color: "white",
                            borderRadius: "18px",
                            marginRight: "15px",
                            fontSize: "12px"
                          }}
                        >
                          <DoneOutlineIcon /> Đã dạy xong
                        </Button>
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
