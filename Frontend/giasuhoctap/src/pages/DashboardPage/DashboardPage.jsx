import React from 'react'
import Navbar from '../../components/layouts/Navbar/Navbar'
import Sidebar from '../../components/layouts/Sidebar/Sidebar'
import AppView from '../../components/partial/overview/view/app-view'

export default function DashboardPage() {
    return (
        <div style={{ height: "90vh", position: "relative", top: "0" }}>
            <div style={{
                position: "fixed", top: "0", height: "100%", bottom: "0", width: "260px", left: "0",
                zIndex: "1030", borderRight: "1px solid #ddd", backgroundColor: "#212120"
            }}>
                <Sidebar />
            </div>
            <div className="fixed top-0 left-64 z-10" style={{ width: "calc(100% - 260px)", float: "right" }}>
                <Navbar />
            </div>
            <div style={{
                overflow: "hidden", overflowAnchor: "none", float: "right", backgroundColor: "#f4f3ef",
                position: "relative", width: "calc(100% - 260px)", height: "100%", maxHeight: "100%", marginTop: "96px"
            }}
                className="p-4 overflow-y-auto">
                <AppView />
            </div>
        </div>


    )
}
