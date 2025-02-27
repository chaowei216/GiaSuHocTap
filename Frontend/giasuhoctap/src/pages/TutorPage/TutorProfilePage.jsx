import Navbar from '../../components/layouts/Navbar/Navbar'
import PersonalProfile from '../../components/partial/Profile/UserProfile'
import SidebarTutor from '../../components/layouts/Sidebar/SidebarTutor'
import style from './style.module.css';
import useAuth from '../../hooks/useAuth';
export default function TutorProfilePage() {
    const { user } = useAuth()
    return (
        <div>
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

                    <PersonalProfile />
                </div>
            </div>
        </div>
    )
}
