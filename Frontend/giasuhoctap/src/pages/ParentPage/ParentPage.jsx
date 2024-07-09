import SideBar from '../../components/partial/ParentManagement/SideBar/SideBar'
import ParentProfile from '../../components/partial/ParentManagement/ParentProfile/ParentProfile'
import FlowAccount from '../../components/partial/ParentManagement/FlowAccount/FlowAccount'
import Navbar from '../../components/partial/HomePage/Navbar/Navbar'

export default function ParentPage() {
    return (
        <div>
            <Navbar />
            <div style={{ display: 'flex', height: '100%', width: '100%' }}>
                <div style={{ width: '20%' }}>
                    <SideBar />
                </div>
                <div style={{ width: '80%' }}>
                    <div>
                        <FlowAccount />
                        <ParentProfile />
                    </div>
                </div>
            </div>
        </div>
    )
}
