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
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BlockIcon from '@mui/icons-material/Block';
import LockOpenIcon from '@mui/icons-material/LockOpen';

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
        timeTableId: time.timeTableId,
        dayOfWeek: time.dayOfWeek,
        period: time.period,
        learningType: time.learningType,
        startTime: time.startTime,
        endTime: time.endTime,
        status: time.status
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
  const groupedTimeTables = groupTimeTables(data || []);
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
    <div>

      <div style={{ marginBottom: "20px" }}>
        <Button variant="contained" style={{ fontWeight: "bold", textTransform: "none", fontSize: "16px" }} onClick={() => handleClickUpdate()}>
          <EditIcon /> Chỉnh sửa lịch
        </Button>
      </div>

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
            {groupedTimeTables.map((row, index) => (
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
                  {translateDayOfWeek(row.dayOfWeek)}
                </StyledTableCell>
                <StyledTableCell
                  style={{ fontWeight: "600" }}
                  align="left"
                >
                  {row.startTime} giờ
                </StyledTableCell>
                <StyledTableCell
                  style={{ fontWeight: "600" }}
                  align="left"
                >
                  {row.endTime} giờ
                </StyledTableCell>
                <StyledTableCell
                  style={{ fontWeight: "600" }}
                  align="left"
                >
                  {translatePeriod(row.period)}
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
                  {StatusType.map((type, idx) => {
                    if (row.status === type) {
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
                        <div className={styleName} key={idx}>
                          {type}
                        </div>
                      );
                    }
                    return null;
                  })}
                </StyledTableCell>
                <StyledTableCell
                  style={{ fontWeight: "600" }}
                  align="left"
                >
                  {row.status === "Rảnh" && (
                    <Button variant="text" sx={{ color: "black" }} onClick={() => handleClickDelete(row.timeTableId)}>
                      <BlockIcon /> Tạm hủy lịch
                    </Button>
                  )}
                  {row.status === "Đã hủy" && (
                    <Button variant="text" sx={{ color: "black" }} onClick={() => handleActive(row.timeTableId)}>
                      <LockOpenIcon /> Mở lại lịch
                    </Button>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
