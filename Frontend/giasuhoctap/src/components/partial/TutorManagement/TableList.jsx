import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from "@mui/material/Paper";
import { Navigate } from 'react-router-dom';
import FormatDate from "../../../utils/format-date"
import { useEffect, useState } from 'react';
import fakeDate from "../../../data/fakeData.json"
import styles from "../../partial/TutorManagement/status.module.css";
export default function TableList() {
    const [data, setData] = useState([]);
    const styleHeader = {
        gap: "6px",
        display: "flex",
        marginTop: "4px",
        witdh: "150px",
        justifyContent: "center"
    };
    const TableHeader = [
        "ID",
        "Email",
        "Date Of Birth",
        "Identity Number",
        "Phone",
        "Address",
        "Status",
    ];
    const StatusType = [
        "Active",
        "Pending"
    ]
    useEffect(() => {
        setData(fakeDate);
    }, [])
    console.log(data);
    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="simple table" size="small">
                    <TableHead style={{ backgroundColor: "#2d3748" }}>
                        <TableRow>
                            {TableHeader.map((row, index) => (
                                <TableCell
                                    style={{ color: "white", alignItems: "center", height: "50px" }}
                                    align="left"
                                    key={index}
                                >
                                    <span style={{ fontSize: "larger" }}>{row}</span>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody
                        sx={{
                            "&:last-child td, &:last-child th": {
                                borderBottom: 1,
                                borderColor: "#2d3748",
                            },
                        }}
                    >
                        {/* {!data && <NoDataPage />} */}
                        {/* {isSearch && data && data.length === 0 && <NoDataPage />} */}
                        {/* {!isSearch && data && data.length === 0 && ( */}
                        {/* <TableRow
                                style={{ textAlign: "center" }}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell
                                    style={{ fontWeight: "600" }}
                                    component="th"
                                    scope="row"
                                    colSpan={8}
                                >
                                    <div
                                        style={{
                                            height: "100px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <GlobalLoading isLoading={(!isSearch && !isFiltered && data && data.length === 0)} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        )} */}
                        {data &&
                            data.map((row, index) => {
                                return (
                                    <TableRow
                                        style={{ textAlign: "center" }}
                                        key={index}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell
                                            style={{ fontWeight: "600", width: "100px" }}
                                            component="th"
                                            scope="row"
                                        >
                                            {row.id}
                                        </TableCell>
                                        <TableCell
                                            sx={{ fontWeight: "600", width: "230px" }}
                                            component="th"
                                            align="left"
                                            scope="row"
                                        >
                                            <Button
                                                sx={{ paddingLeft: "0px" }}
                                            // onClick={() => Navigate(`/class-detail/${row.classId}`)}
                                            >
                                                <span>{row.fullName}</span>
                                            </Button>
                                        </TableCell>
                                        <TableCell
                                            style={{ fontWeight: "600", width: "200px"  }}
                                            align="left"
                                        >
                                            {FormatDate(row.birthDate)}
                                        </TableCell>
                                        <TableCell
                                            style={{ fontWeight: "600", width: "200px" }}
                                            align="middle"
                                        >
                                            {row.identityNumber}
                                        </TableCell>
                                        <TableCell
                                            style={{ fontWeight: "600", width: "200px"  }}
                                            align="left"
                                        >
                                            {row.phone}
                                        </TableCell>
                                        <TableCell
                                            style={{ fontWeight: "600", width: "250px"  }}
                                            align="left"
                                        >
                                            {row.address}
                                        </TableCell>
                                        <TableCell
                                            sx={{ width: "150px", paddingLeft: "0px", paddingRight: "20px" }}
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
                                        </TableCell>
                                        {/* <TableCell align="center">
                                            <Action
                                                setOpen={setOpen}
                                                row={row}
                                                setA={setA}
                                                setData={setData}
                                                rerender={rerender}
                                            />
                                        </TableCell> */}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
