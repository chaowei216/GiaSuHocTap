import LayoutRegisterPage from "../../components/partial/Authen/LayoutAuthen/LayoutRegisterPage"
import RegisterTutor from "../../components/partial/Authen/registerTutor"

function RegisterTutorPage() {
    return (
        <div className="flex justify-center align-middle" style={{ height: "100%", alignItems: "center" }}>
            <div style={{
                display: "flex", alignItems: "center", height: "100%", marginTop: "2rem",
                borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
            }}>
                <div style={{ width: "100%", padding: "20px" }}>
                    <RegisterTutor />
                </div>
                {/* <div style={{ width: "50%", marginRight: "20px" }}><LayoutRegisterPage styleSizeBg="75vh" /></div> */}
            </div>
        </div>
    )
}
export default RegisterTutorPage
