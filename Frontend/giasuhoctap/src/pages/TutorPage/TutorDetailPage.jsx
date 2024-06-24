import React, { useState } from 'react'
import TutorDetailContainer from '../../components/partial/TutorDetail/TutorDetailContainer'
import NavbarResponsive from '../../components/partial/HomePage/NavbarResponsive/NavbarResponsive';
import Navbar from '../../components/partial/HomePage/Navbar/Navbar';

export default function TutorDetailPage() {
    const [hamActive, setHamActive] = useState(false);
    return (
        <div>
            <div className='fixed top-0 left-0 right-0 z-10' style={{ border: "1px solid #dcdcdc" }}>
                <Navbar hamActive={hamActive} setHamActive={setHamActive} />
            </div>
            <div style={{marginTop: "10rem"}}>
                <TutorDetailContainer />
            </div>
        </div>
    )
}
