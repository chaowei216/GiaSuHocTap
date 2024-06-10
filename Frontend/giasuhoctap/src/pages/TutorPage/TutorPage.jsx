import React from 'react'
import Navbar from '../../components/layouts/Navbar/Navbar'
import Sidebar from '../../components/layouts/Sidebar/Sidebar'
import ViewTutor from '../../components/partial/TutorManagement/ViewTutor'

export default function TutorPage() {
    return (
        <div>
            <div className="fixed top-0 left-0 right-0 z-10 bg-gray-200">
                <Navbar />
            </div>
            <div className="flex mt-32">
                <div className=" fixed left-0 overflow-y-auto">
                    <Sidebar />
                </div>
                <div className="w-2/3 ml-72 p-4 flex-1 overflow-y-auto">
                    <ViewTutor />
                </div>
            </div>
        </div>
    )
}
