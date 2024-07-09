import React from 'react'
import SideBar from '../../components/partial/ParentManagement/SideBar/SideBar'
import Navbar from '../../components/partial/HomePage/Navbar/Navbar'
import HistoryTransaction from '../../components/partial/ParentManagement/HistoryTransaction/HistoryTransaction'

export default function ParentHistoryTransaction() {
    return (
        <div >
            <Navbar />
            <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
                <div style={{ width: '20%' }}>
                    <SideBar />
                </div>
                <div style={{ width: '80%', background: 'rgba(202, 234, 243, 0.28)' }}>
                    <div>
                        <HistoryTransaction />
                    </div>
                </div>
            </div>
        </div>
    )
}
