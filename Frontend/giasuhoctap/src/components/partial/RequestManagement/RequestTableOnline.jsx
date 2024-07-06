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
export default function RequestTableOnline({
    data,
    handleHire,
    handleOpenDeny
}) {
    const [dataDetail, setDataDetail] = useState();
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
        "Người yêu cầu",
        "Địa điểm",
        "Lương (VND)",
        "Mô tả",
        "Lớp",
        "Môn",
        "Trạng thái",
        "Hành động",
    ];
    const StatusType = ["Completed", "Pending"];

    const handleClickOpenDetail = (data) => {
        setDataDetail(data)
        setOpenDetail(true);
    };
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
                                            {row.price}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            style={{ fontWeight: "600" }}
                                            align="middle"
                                        >
                                            {row.description}
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
                                                            case "Completed":
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
                                            <Button
                                                variant="contained"
                                                color="success"
                                                onClick={() => handleHire(row.requestId)}
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
                                                onClick={() => handleOpenDeny(row.requestId)}
                                                color="error"
                                                sx={{ background: "#de473a", color: "white", borderRadius: "18px", fontSize: "12px" }}
                                            >
                                                <div>
                                                    <ClearIcon /> Deny
                                                </div>
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