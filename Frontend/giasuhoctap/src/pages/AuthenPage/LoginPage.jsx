import Login from "../../components/partial/Authen/login";
import LayoutLoginPage from "../../components/partial/Authen/LayoutAuthen/LayoutLoginPage";

const LoginPage = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ width: "50%" }}>
        <Login />
      </div>
      <div style={{ width: "50%"}}><LayoutLoginPage /></div>
    </div>
  );
};

export default LoginPage;
