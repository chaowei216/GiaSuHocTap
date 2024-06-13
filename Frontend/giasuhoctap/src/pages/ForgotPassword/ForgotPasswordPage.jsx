import Login from "../../components/partial/Authen/login";
import LayoutForgotPassword from "../../components/partial/Authen/LayoutAuthen/LayoutForgotPasswordPage.jsx";
import ForgotPassword from "../../components/partial/Authen/forgotPassword";

const ForgotPasswordPage = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ width: "50%" }}><LayoutForgotPassword /></div>
      <div style={{
        margin: "0px 30px 0px 30px", width: "50%",
        borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
      }}>
        <ForgotPassword />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
