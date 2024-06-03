import React from 'react'
import Navbar from '../../components/layouts/Navbar/Navbar'
import Sidebar from '../../components/layouts/Sidebar/Sidebar'
import AppView from '../../components/partial/overview/view/app-view'

export default function DashboardPage() {
    return (
        <div className="flex flex-col min-h-screen overflow-y-hidden"
            style={{ overflowX: "hidden", boxSizing: "border-box" }}>
            <Navbar />
            <div className="flex flex-1 overflow-hidden"
                style={{ overflowY: "auto", overflowX: "hidden" }}
            >
                <Sidebar />
                <div className="flex-1 overflow-y-auto" style={{ overflowX: "hidden" }}>
                    {/* <DemoPartial /> */}
                    <AppView/>
                </div>
            </div>
        </div>
    )
}
