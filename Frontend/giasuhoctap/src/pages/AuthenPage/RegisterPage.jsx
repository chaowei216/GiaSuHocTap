import LayoutLoginPage from "../../components/partial/Authen/leftLoginPage"
import Register from "../../components/partial/Authen/register"

function RegisterPage() {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: "50%" }}>
                <Register />
            </div>
            <div style={{ width: "50%" }}><LayoutLoginPage /></div>
        </div>
    )
}
export default RegisterPage
