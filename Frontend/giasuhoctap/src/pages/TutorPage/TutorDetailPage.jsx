import React, { useState } from 'react'
import TutorDetailContainer from '../../components/partial/TutorDetail/TutorDetailContainer'
import NavbarResponsive from '../../components/partial/HomePage/NavbarResponsive/NavbarResponsive';
import Navbar from '../../components/partial/HomePage/Navbar/Navbar';

export default function TutorDetailPage() {
    const [hamActive, setHamActive] = useState(false);
    return (
        <div>
            <div>
                <Navbar hamActive={hamActive} setHamActive={setHamActive} />
                <NavbarResponsive hamActive={hamActive} />
            </div>
            <div>
                <TutorDetailContainer />
            </div>
        </div>
    )
}
