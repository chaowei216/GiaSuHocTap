import { jwtDecode } from "jwt-decode";
import { RefreshToken } from "../api/AuthenApi";
//

// ----------------------------------------------------------------------

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  // ----------------------------------------------------------------------

  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;
  console.log(decoded);
  console.log(currentTime);

  return decoded.exp > currentTime;
};

const handleTokenExpired = (exp, refreshToken) => {
  let expiredTimer;

  window.clearTimeout(expiredTimer);
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;
  console.log(timeLeft);
  expiredTimer = window.setTimeout(() => {
    console.log("expired");
    // You can do what ever you want here, like show a notification
    // cái này thì chắc là cho cái handleTokenExpired nhận thêm parameter là (accessToken, refreshToken)
    alert("het han");
  }, timeLeft);
};

// ----------------------------------------------------------------------

const setSession = (accessToken, refreshToken) => {
  if (accessToken && refreshToken) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    // This function below will handle when token is expired
    const { exp } = jwtDecode(accessToken);
    console.log(exp);
    handleTokenExpired(exp, refreshToken);
  } else {
    localStorage.removeItem("accessToken");
  }
};

const requestNewToken = (refreshToken) => {
  // Gửi yêu cầu lấy token mới sử dụng refreshToken
  // Ví dụ: sử dụng fetch API để gửi yêu cầu lấy token mới
  const accessToken = localStorage.getItem("accessToken");
  const response = RefreshToken(accessToken, refreshToken)
  const responseJson = response.json();
  console.log(responseJson);
  //set token nha 
};

const refreshTokenValid = (refreshToken) => {
  // Kiểm tra tính hợp lệ của refreshToken, ở đây giả sử refreshToken luôn hợp lệ
  return true;
};

export { isValidToken, setSession };