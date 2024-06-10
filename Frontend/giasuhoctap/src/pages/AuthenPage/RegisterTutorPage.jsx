import LayoutRegisterPage from "../../components/partial/Authen/LayoutAuthen/LayoutRegisterPage"
import RegisterTutor from "../../components/partial/Authen/registerTutor"

function RegisterTutorPage() {
    return (
        <div className="flex justify-center align-middle" style={{ height: "100%", alignItems: "center", margin: "30px" }}>
            <div style={{
                display: "flex", alignItems: "center", width: "80%", height: "96%",
                borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
            }}>
                <div style={{ width: "50%", margin: "20px 0px 20px 0px" }}>
                    <RegisterTutor />
                </div>
                <div style={{ width: "50%", marginRight: "20px" }}><LayoutRegisterPage styleSizeBg="114vh" /></div>
            </div>
        </div>
    )
}
export default RegisterTutorPage
