import Navbar from '../../components/layouts/Navbar/Navbar';
import SidebarTutor from '../../components/layouts/Sidebar/SidebarTutor';
import useAuth from '../../hooks/useAuth';
import DashboardTutor from './DashboardTutor';
import style from './style.module.css';

export default function HomeTutorPage() {
    const { user } = useAuth()
    return (
        <div style={{ height: "90vh", position: "relative", top: "0" }}>
            <div style={{
                position: "fixed", top: "0", height: "100%", bottom: "0", width: "260px", left: "0",
                zIndex: "1030", borderRight: "1px solid #ddd", backgroundColor: "#212120"
            }}>
                <SidebarTutor />
            </div>
            <div className="fixed top-0 left-64 z-10" style={{ width: "calc(100% - 260px)", float: "right" }}>
                <Navbar />
            </div>
            <div style={{
                overflow: "hidden", overflowAnchor: "none", float: "right", backgroundColor: "#f4f3ef",
                position: "relative", width: "calc(100% - 260px)", height: "100%", maxHeight: "100%", marginTop: "96px"
            }}
                className="p-4 overflow-y-auto">
                <div className={style.dashboard}>
                    <header className={style.header}>
                        <h1>Xin Chào Giáo Viên {user?.fullname}</h1>
                    </header>
                </div>
                <DashboardTutor />
            </div>
        </div>
    );
}
