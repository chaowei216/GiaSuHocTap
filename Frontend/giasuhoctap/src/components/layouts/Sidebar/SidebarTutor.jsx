import { useContext, useEffect } from "react";
import { createContext } from "react";
// import { useLocation, useNavigate } from 'react-router-dom';
import logoControl from "/img/control.png";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css"
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import logoEdu from "/img/logoGiasu.png";
import WorkOffIcon from '@mui/icons-material/WorkOff';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
export default function SidebarTutor() {
  const Menus = [
    {
      title: "Home",
      path: "/home-tutor",
      icon: <HomeIcon />,
      id: 0,
      src: "/home-tutor",
    },
    {
      title: "User Profile",
      path: "/tutor-profile",
      icon: <PersonIcon />,
      id: 1,
      src: "/tutor-profile",
    },
    {
      title: "Online Request",
      path: "/request-tutor",
      icon: <WorkHistoryIcon />,
      id: 2,
      src: "/request-tutor",
    },
    {
      title: "Offline Request",
      path: "/request-tutor-offline",
      icon: <WorkOffIcon />,
      id: 3,
      src: "/request-tutor-offline",
    },
  ];
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState('/');

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
            <p><ExitToAppIcon /> Back to homepage</p>
          </NavLink>
        </li>
      </div>
    </>
  );
}
