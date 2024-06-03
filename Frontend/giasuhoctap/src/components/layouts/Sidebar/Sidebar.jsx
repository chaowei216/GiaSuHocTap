import { useContext } from 'react';
import { createContext } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
import logoControl from "/img/control.png"
import { NavLink } from 'react-bootstrap';
import { useState } from 'react';
import home from "/img/icons-home.svg?url"
import icon_reqeust from "/img/icon-request.svg?url"
import icon_tutor from "/img/icon-tutor.svg?url"
import closeIcon from "/img/arrow-left.svg?url"
export const MyGlobalContext = createContext({
    isSidebarOpen: true,
    setIsSidebarOpen: () => { },
    trainingProgramData: null,
    setTrainingProgramData: () => { },
    refreshData: () => { }
});

export const useGlobalContext = () => useContext(MyGlobalContext);

export default function Sidebar() {
    const { setIsSidebarOpen } = useGlobalContext();
    const [open, setOpen] = useState(true);
    //const navigate = useNavigate();
    //const location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState({});
    const [tempDropdownState, setTempDropdownState] = useState({});

    const toggleDropdown = (id) => {
        setIsDropdownOpen((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleSidebarToggle = () => {
        if (!open) {
            setIsDropdownOpen(tempDropdownState);
        }
        setOpen((prevOpen) => {
            const newOpenState = !prevOpen;
            setIsSidebarOpen(newOpenState);

            if (!newOpenState) {
                setTempDropdownState(isDropdownOpen);
                setIsDropdownOpen({});
            }
            return newOpenState;
        });
    };

    const Menus = [
        {
            title: "Home",
            path: "/",
            icon: home,
            id: 0,
            src: "/",
        },
        {
            title: "Request Management",
            path: "",
            icon: icon_reqeust,
            id: 1,
            iconOpened: closeIcon,
            subnav: [
                {
                    title: "Student list",
                    src: "/system-view",
                },
                {
                    title: "Reserve list",
                    src: "/reservation-management",
                },
            ],
        },
        {
            title: "Tutor Management",
            path: "",
            icon: icon_tutor,
            id: 2,
            iconOpened: closeIcon,
            subnav: [
                {
                    title: "View Syllabus",
                    src: "/syllabus",
                },
                {
                    title: "Create Syllabus",
                    src: "/syllabus/create",
                },
            ],
        },
        {
            title: "Training Program",
            path: "",
            //icon: biotech,
            id: 3,
            iconOpened: closeIcon,
            subnav: [
                {
                    title: "View Program",
                    src: "/trainingprogram",
                },
                {
                    title: "Create Program",
                    src: "/trainingprogram/create",
                },
            ],
        },
        {
            title: "Class",
            path: "",
            //icon: school,
            id: 4,
            iconOpened: closeIcon,
            subnav: [
                {
                    title: "View Class",
                    src: "/classList",
                },
                {
                    title: "Create Class",
                    src: "/createclass",
                },
            ],
        },
        {
            title: "User Management",
            path: "",
            //icon: role,
            id: 6,
            iconOpened: closeIcon,
            subnav: [
                {
                    title: "User List",
                    src: "/user-management",
                },
                {
                    title: "User Permissions",
                    src: "/user-permission",
                },
            ],
        }
    ];
    return (
    <div className="flex">
      {/* <GlobalLoading isLoading={isLoading}/> */}
      <div className="bg-slate-200 ring-offset-blue-950''">
        <div
          className={`${
            open ? "w-72" : "w-20"
          } p-5 pt-8 relative duration-300 bg-slate-200`}
        >
          <img
            src={logoControl}
            alt="control"
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${
              !open && "rotate-180"
            }`}
            onClick={handleSidebarToggle}
          />
          {/* <div className="flex gap-x-4 items-center">
            <img
              src={chartfill}
              className={`cursor-pointer duration-500 ${
                !open && "rotate-[360deg]"
              }`}
              onClick={() => fetchUserInfo(token, username)}
            />
          </div> */}
            <ul className="pt-6">
              {Menus.map((menu, index) => {
                return (
                  <li key={index} className="mb-8">
                    <NavLink
                      to={menu.path}
                      className={({ isActive }) =>
                        isActive ? "active" : "inactive"
                      }
                      onClick={(e) => {
                        if (menu.subnav && menu.id !== 0) {
                          e.preventDefault();
                          toggleDropdown(menu.id);
                        }
                      }}
                    >
                      <div className="flex items-center">
                        <img src={menu.icon} alt="" className="icon" style={{marginRight: "20px"}} />
                        {/* <HomeWorkIcon/> */}
                        <span
                          className={`${
                            !open && "hidden"
                          } origin-left duration-200 flex items-center justify-between w-full`}
                        >
                          {menu.title}
                          {menu.subnav && (
                            <img
                              
                              src={menu.iconOpened}
                              className={`transition-transform ${
                                isDropdownOpen[menu.id]
                                  ? "rotate-180"
                                  : "rotate-0"
                              }`}
                              alt="toggle"
                            />
                          )}
                        </span>
                      </div>
                    </NavLink>
                    {menu.subnav && (
                      <ul
                        className={`pl-12 overflow-hidden transition-max-height duration-100 ease-in-out ${
                          isDropdownOpen[menu.id] ? "max-h-96" : "max-h-0"
                        }`}
                      >
                        {menu.subnav.map((subItem, subIndex) => (
                          <li key={subIndex} className="mt-1 bg-slate-200">
                            <NavLink
                              to={subItem.src}
                              className="block p-2 hover:bg-blue-200 text-sm transition-colors duration-100 ease-in-out"
                            >
                              {subItem.title}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
        </div>
      </div>
    </div>
    )
}
