import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Logout } from "../../api/AuthenApi";

function CheckingPageTutor() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleClickLogout = async () => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken == null || refreshToken == undefined) {
            await logout();
            navigate("/login")
            return;
        }
        const response = await Logout(refreshToken)
        if (response.ok) {
            await logout();
            navigate("/login")
        }
    }
    return (
        <div className="w-full h-screen grid grid-cols-12 lg:flex-row items-center justify-center space-y-16 lg:space-y-0 space-x-8 2xl:space-x-0 bg-slate-100">
            <div className="col-span-7">
                <div className="w-full lg:w-full flex flex-col items-center justify-center lg:px-2 xl:px-0 text-center">
                    <p className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider text-gray-700">
                        Đang kiểm duyệt tài khoản
                    </p>
                    <p className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider text-gray-700" style={{ marginTop: "40px" }}>
                        Vui lòng chờ email từ chúng tôi
                    </p>
                    <p className="text-xl md:text-xl lg:text-2xl text-gray-500 my-12">
                        Cảm ơn bạn {user?.fullname} đã đăng ký. Chúng tôi đang kiểm tra thông tin của bạn. Vui lòng chờ email xác nhận từ chúng tôi.
                    </p>
                    <Link
                        onClick={handleClickLogout}
                        className="flex items-center space-x-2 bg-slate-600 hover:bg-slate-700 text-gray-100 px-4 py-2 rounded transition duration-150"
                        title="Return Home"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <span>Quay về đăng nhập</span>
                    </Link>
                </div>
            </div>
            <div className="col-span-5">
                <div className="w-full lg:h-full flex lg:items-center justify-start">
                    <img
                        src="/img/hinhRobo.png"
                        alt="Waiting for verification"
                        className="object-contain"
                    />
                </div>
            </div>
        </div>
    );
}

export default CheckingPageTutor;
