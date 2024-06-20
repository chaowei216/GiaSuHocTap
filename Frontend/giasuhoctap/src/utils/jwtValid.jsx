import { jwtDecode } from "jwt-decode";
import { RefreshToken } from "../api/AuthenApi";
import { toast } from "react-toastify";
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

const handleTokenExpired = (exp, refreshToken, accessToken) => {
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;
  const refreshTimeLeft = timeLeft + 5000; // 5 second after expiration

  // console.log("Token will refresh in:", timeLeft / 1000 , "seconds");

  const refreshAndScheduleNext = () => {
    if (timeLeft <= 0) {
      console.log("Token expired, stopping refresh.");
      return;
    }

    RefreshToken(accessToken, refreshToken)
      .then(response => {
        if (response.statusCode === 200) {
          const { data } = response;
          console.log(response);
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          console.log("Token refreshed successfully");
          setTimeout(refreshAndScheduleNext, refreshTimeLeft);
        } else {
          console.log(response);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          return;
        }
      })
      .catch(error => {
        console.error("Error during token refresh:", error.message);
        return;
      });
  };

  // Initial call to start the refresh cycle
  setTimeout(refreshAndScheduleNext, refreshTimeLeft);
};


// ----------------------------------------------------------------------

const setSession = (accessToken, refreshToken) => {
  if (accessToken && refreshToken) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    // This function below will handle when token is expired
    const { exp } = jwtDecode(accessToken);
    console.log(exp);
    handleTokenExpired(exp, refreshToken, accessToken);
  } else {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
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