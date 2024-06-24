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

export const MyGlobalContext = createContext({
  isSidebarOpen: true,
  setIsSidebarOpen: () => { },
  trainingProgramData: null,
  setTrainingProgramData: () => { },
  refreshData: () => { },
});

export const useGlobalContext = () => useContext(MyGlobalContext);

export default function Sidebar() {
  const Menus = [
    {
      title: "Home",
      path: "/test",
      icon: <HomeIcon />,
      id: 0,
      src: "/test",
    },
    {
      title: "User Profile",
      path: "/personal-profile",
      icon: <PersonIcon />,
      id: 1,
      src: "/personal-profile",
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
      path: "/tutor",
      icon: <WorkOffIcon />,
      id: 3,
      src: "/tutor",
    },
    {
      title: "Notifications",
      path: "/nontification",
      icon: <NotificationsIcon />,
      id: 4,
      src: "/nontification",
    },
  ];
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);
  return (
    <div className={styles.sidebar}>
      <div className={styles.header_container}>
        <img src={logoEdu} alt="avatar logo" width={75} />
        <div className={styles.header_sidebar}>Gia sư học tập</div>
      </div>
      <hr style={{border: "1px solid white"}}/>
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
  );
}
