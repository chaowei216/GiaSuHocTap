import LayoutSendOtpPage from "../../components/partial/Authen/LayoutAuthen/LayoutSendOtpPage"
import SendOTP from "../../components/partial/Authen/sendOTP";
const SendOtpPage = () => {
    return (
        <div style={{ display: "flex", alignItems: "center",marginTop: "80px" }}>
            <div style={{
                margin: "0px 30px 0px 90px", width: "50%",
                borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
            }}>
                <SendOTP />
            </div>
            <div style={{ width: "50%" }}><LayoutSendOtpPage /></div>
        </div>
    );
};

export default SendOtpPage;
