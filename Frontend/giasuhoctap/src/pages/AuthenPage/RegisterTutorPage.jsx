import LayoutRegisterPage from "../../components/partial/Authen/LayoutAuthen/LayoutRegisterPage"
import RegisterTutor from "../../components/partial/Authen/registerTutor"

function RegisterTutorPage() {
    return (
        <div className="flex justify-center align-middle" style={{ height: "100%", alignItems: "center"}}>
            <div style={{
                display: "flex", alignItems: "center", height: "96%", marginTop:"20px",
                borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
            }}>
                <div style={{ width: "50%", margin: "20px 0px 20px 0px" }}>
                    <RegisterTutor />
                </div>
                <div style={{ width: "50%", marginRight: "20px" }}><LayoutRegisterPage styleSizeBg="90vh" /></div>
            </div>
        </div>
    )
}
export default RegisterTutorPage
