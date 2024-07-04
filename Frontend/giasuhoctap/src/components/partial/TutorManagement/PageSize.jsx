import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import style from "./pageSize.module.css"

function PageSize({ pageSize, setPageSize }) {
    function handleChange(event) {
        setPageSize(event.target.value);
    }

    return (
        <li style={{ width: "46%" }}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    width: "250px",
                }}
            >
                <div>Rows per page</div>
                <div className={style.show}>
                    <FormControl sx={{ minWidth: 120, border: "none" }}>
                        <Select labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" value={pageSize} onChange={handleChange} label="perPage" style={{ border: "none", width: "55%" }}>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={15}>15</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
        </li>
    );
}

export default PageSize;
