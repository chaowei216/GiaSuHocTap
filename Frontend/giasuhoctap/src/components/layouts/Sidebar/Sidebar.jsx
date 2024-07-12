import { useEffect } from "react";
// import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css"
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import logoEdu from "/img/logoGiasu.png";
import useAuth from "../../../hooks/useAuth";
import GroupIcon from '@mui/icons-material/Group';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ReportIcon from '@mui/icons-material/Report';
export default function Sidebar() {
  const { user } = useAuth();
  const Menus = [
    {
      title: "Thống kê",
      path: "/dashboard",
      icon: <HomeIcon />,
      id: 12,
      src: "/dashboard",
    },
    {
      title: "Trang cá nhân",
      path: "/personal-profile",
      icon: <PersonIcon />,
      id: 1,
      src: "/personal-profile",
    },
    {
      title: "Giao dịch",
      path: "/transaction",
      icon: <AccountBalanceIcon />,
      id: 4,
      src: "/transaction",
    },
  ];
  if (user?.roleName === 'Moderator') {
    Menus.push({
      title: "Thông báo",
      path: "/view-notification",
      icon: <GroupIcon />,
      id: 32,
      src: "/view-notification",
    },
      {
        title: "Đánh giá",
        path: "/view-feedback",
        icon: <FeedbackIcon />,
        id: 42,
        src: "/view-feedback",
      },
      {
        title: "Báo cáo",
        path: "/view-report",
        icon: <ReportIcon />,
        id: 52,
        src: "/view-report",
      });
  }
  if (user?.roleName === 'Admin') {
    Menus.push(
      {
        title: "Quản lý người dùng",
        path: "/user-management",
        icon: <GroupIcon />,
        id: 13,
        src: "/user-management",
      },
      {
        title: "Duyệt gia sư mới",
        path: "/tutor",
        icon: <WorkHistoryIcon />,
        id: 2,
        src: "/tutor",
      });
  }
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
            <p><ExitToAppIcon /> Trở về trang chủ</p>
          </NavLink>
        </li>
      </div>
    </>
  );
}
