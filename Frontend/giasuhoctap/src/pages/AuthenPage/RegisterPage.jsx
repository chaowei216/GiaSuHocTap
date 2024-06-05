import LayoutRegisterPage from "../../components/partial/Authen/LayoutAuthen/LayoutRegisterPage"
import Register from "../../components/partial/Authen/register"

function RegisterPage() {
    return (
        <div className="flex justify-center align-middle" style={{ height: "100vh", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", width: "80%", height: "96%",
             borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                <div style={{ width: "50%" }}>
                    <Register />
                </div>
                <div style={{ width: "50%", paddingRight: "20px" }}><LayoutRegisterPage /></div>
            </div>
        </div>
    )
}
export default RegisterPage
