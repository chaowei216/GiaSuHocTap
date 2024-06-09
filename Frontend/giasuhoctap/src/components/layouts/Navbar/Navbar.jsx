import style from "./style.module.css";
import avatar from "/img/avatar.png";
import logoEdu from "/img/logoGiasu.png";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import MailIcon from '@mui/icons-material/Mail';
import { Badge, Stack } from "@mui/material";
import { useState } from "react";
import BasicMenu from "./DropdownAva";
export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    console.log("log out");
  };
  return (
    <div className={style.main}>
      <img src={logoEdu} alt="avatar logo" width={160} />
      <div>
        <Stack spacing={2} direction="row">
          <Badge badgeContent={10} color="default" showZero>
            <NotificationsNoneOutlinedIcon color="white" />
          </Badge>
        </Stack>
        {/* {token && ( */}
        <div style={{display: "flex", alignItems: "center", gap:"5px"}}>
          <BasicMenu anchorEl={anchorEl} handleClick={handleClick} handleClose={handleClose}>
            <img
              src={avatar}
              alt="User avatar"
              className={`${style.logo} ${style.avatar}`}
              style={{
                borderRadius: "50%",
                border: "1px solid white",
                cursor: "pointer",
                width: "44px",
                height: "44px",
              }}
            />
          </BasicMenu>
          <span>Lê Việt Hùng</span>
        </div>

        {/* )} */}
      </div>
    </div>
  );
}