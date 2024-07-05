import React from 'react'
import SideBar from '../../components/partial/ParentManagement/SideBar/SideBar'
import NavbarHistoryP from '../../components/partial/ParentManagement/NavbarHistoryP/NavbarHistoryP'
import Navbar from '../../components/partial/HomePage/Navbar/Navbar'
import Complete from '../../components/partial/ParentManagement/Complete/Complete'

export default function ParentHistory() {
    return (
        <div >
            <Navbar />
            <div style={{ display: 'flex', height: '100%', width: '100%' }}>
                <div style={{ width: '20%' }}>
                    <SideBar />
                </div>
                <div style={{ width: '80%', background: 'rgba(202, 234, 243, 0.28)' }}>
                    <div>
                        <NavbarHistoryP />
                        <Complete />
                    </div>
                </div>
            </div>
        </div>
    )
}
