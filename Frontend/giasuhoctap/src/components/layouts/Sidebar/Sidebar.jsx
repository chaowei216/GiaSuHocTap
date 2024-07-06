import { useContext, useEffect } from "react";
import { createContext } from "react";
// import { useLocation, useNavigate } from 'react-router-dom';
import logoControl from "/img/control.png";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css"
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import WorkOffIcon from '@mui/icons-material/WorkOff';
import logoEdu from "/img/logoGiasu.png";
import useAuth from "../../../hooks/useAuth";
import GroupIcon from '@mui/icons-material/Group';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
export default function Sidebar() {
  const { user } = useAuth();
  const Menus = [
    {
      title: "Home",
      path: "/dashboard",
      icon: <HomeIcon />,
      id: 0,
      src: "/dashboard",
    },
    {
      title: "User Profile",
      path: "/personal-profile",
      icon: <PersonIcon />,
      id: 1,
      src: "/personal-profile",
    },
    {
      title: "Register Request",
      path: "/tutor",
      icon: <WorkHistoryIcon />,
      id: 2,
      src: "/tutor",
    },
    {
      title: "User Management",
      path: "/user-management",
      icon: <GroupIcon />,
      id: 3,
      src: "/user-management",
    },
    {
      title: "Transaction",
      path: "/transaction",
      icon: <AccountBalanceIcon />,
      id: 4,
      src: "/transaction",
    },
  ];
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState('/dashboard');

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);
  return (
    <>
      <div className={styles.sidebar}>
        <div className={styles.header_container}>
          <img src={logoEdu} alt="avatar logo" width={75} />
          <div className={styles.header_sidebar}>Gia sư học tập</div>
        </div>
        <hr style={{ border: "1px solid white" }} />
        <ul className={styles['sidebar-nav']}>
          {Menus.map((menu) => (
            <li key={menu.id} className={styles['sidebar-nav-item']}>
              <NavLink
                exact
                to={menu.path}
                className={`${styles['sidebar-nav-link']} ${currentPath === menu.path && styles.active}`}
              >
                <p>{menu.icon} {menu.title}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ position: "fixed", bottom: "0%", padding: "18px 18px 0px 18px" }}>
        <li className={styles['sidebar-nav-item']}>
          <NavLink
            exact
            to="/"
            className={`${styles['sidebar-nav-link']}`}
          >
            <p><ExitToAppIcon /> Back to home page</p>
          </NavLink>
        </li>
      </div>
    </>
  );
}
