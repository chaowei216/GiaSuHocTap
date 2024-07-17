import style from "./style.module.css";
import avatar from "/img/avatar.png";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import MailIcon from '@mui/icons-material/Mail';
import { Badge, Stack } from "@mui/material";
import { useState } from "react";
import BasicMenu from "./DropdownAva";
import useAuth from "../../../hooks/useAuth"
import NotifyBell from '../../partial/HomePage/Notification/Notification';
const baseUrl = import.meta.env.VITE_API_HOST;

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { user } = useAuth();
  return (
    <div className={style.main}>
      <div>
        <Stack spacing={2} direction="row">
          <NotifyBell />
        </Stack>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          {user?.roleName != "Admin" && (
            <BasicMenu anchorEl={anchorEl} handleClick={handleClick} handleClose={handleClose}>
              <img
                src={`${baseUrl}/api/Auth/user-image?fileName=${user?.userImage}`}
                alt="avatar"
                onError={(e) => {
                  e.currentTarget.src = { avatar };
                }}
                style={{
                  borderRadius: "50%",
                  border: "1px solid white",
                  cursor: "pointer",
                  width: "44px",
                  height: "44px",
                }}
              />
            </BasicMenu>
          )}
          {user?.roleName == "Admin" && (
            <BasicMenu anchorEl={anchorEl} handleClick={handleClick} handleClose={handleClose}>
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                alt="avatar"
                style={{
                  borderRadius: "50%",
                  border: "1px solid white",
                  cursor: "pointer",
                  width: "44px",
                  height: "44px",
                }}
              />
            </BasicMenu>
          )}
          <span>{user?.roleName != "Admin" ? user?.fullname : "Admin"}</span>
        </div>
      </div>
    </div>
  );
}
