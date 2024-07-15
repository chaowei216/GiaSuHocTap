import { useEffect } from "react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css"
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import logoEdu from "/img/logoGiasu.png";
import WorkOffIcon from '@mui/icons-material/WorkOff';
import useAuth from "../../../hooks/useAuth";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
export default function SidebarTutor() {
  const { user } = useAuth()
  const Menus = [
    {
      title: "Trang gia sư",
      path: "/home-tutor",
      icon: <HomeIcon />,
      id: 0,
      src: "/home-tutor",
    },
    {
      title: "Hồ sơ cá nhân",
      path: "/tutor-profile",
      icon: <PersonIcon />,
      id: 1,
      src: "/tutor-profile",
    },
    {
      title: "Yêu cầu trực tuyến",
      path: "/request-tutor",
      icon: <WorkHistoryIcon />,
      id: 2,
      src: "/request-tutor",
    },
    {
      title: "Yêu cầu ngoại tuyến",
      path: "/request-tutor-offline",
      icon: <WorkOffIcon />,
      id: 3,
      src: "/request-tutor-offline",
    },
    {
      title: "Thời gian biểu",
      path: `/time-table/${user?.email}`,
      icon: <CalendarMonthIcon />,
      id: 4,
      src: "/time-table/${user?.email}",
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
    </>
  );
}
