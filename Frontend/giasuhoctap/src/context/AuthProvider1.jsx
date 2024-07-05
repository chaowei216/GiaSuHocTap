import { createContext, useEffect, useReducer, useState } from "react";
import { GetUserByEmail, GetUserByToken, RegisterParent, RegisterTutor, SignIn, VerifyUser } from "../api/AuthenApi";
import { isValidToken, setSession } from "../utils/jwtValid"
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
//---------------
const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  isVerify: false,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),

  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },

  REGISTER_TUTOR: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },

  SEND_OTP: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: false,
      user,
      isVerify: true
    };
  }
};


const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext1 = createContext({
  ...initialState,
  method: "jwt",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  register_tutor: () => Promise.resolve(),
  sendOtp: () => Promise.resolve,
});

// ----------------------------------------------------------------------

function AuthProvider1({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken, refreshToken);
          const { email } = jwtDecode(accessToken);
          const response = await GetUserByEmail(email)
          const responseJson = await response.json();
          const user = responseJson.data
          if (user.isVerified == false) {
            console.log(user.isVerified);
            dispatch({
              type: "SEND_OTP",
              payload: {
                user: user,
              },
            });
          } else {
            dispatch({
              type: "INITIALIZE",
              payload: {
                isAuthenticated: true,
                user: user,
              },
            });
          }
          // ne gio sau cai else la se dung` api refresh token neu no tra ve status code 400 thi minh chay cai set 
          // session(null) con ra true 200 thi set session la 2 cai responseJson la access va refresh          
        } else {
          setSession(accessToken, refreshToken);
          if (accessToken === null || refreshToken === null) {
            dispatch({
              type: "INITIALIZE",
              payload: {
                isAuthenticated: false,
                user: null,
              },
            });
          }
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    const userInput = {
      email: email,
      password: password
    }
    const response = await SignIn(userInput)
    const responseJson = await response.json();
    console.log(responseJson);
    if (responseJson.statusCode == 400) {
      toast.error(responseJson.message)
      return;
    }
    const { token, user } = responseJson.data;
    //localStorage.setItem("accessToken", accessToken);     
    console.log(token.accessToken);
    if (user.isVerified == false) {
      dispatch({
        type: "SEND_OTP",
        payload: {
          user,
        },
      })
      localStorage.setItem("accessToken", token.accessToken);
      localStorage.setItem("refreshToken", token.refreshToken);
      const encodedEmail = btoa(email);
      window.location.replace(`/send-otp/${encodedEmail}`);
      return;
    }
    setSession(token.accessToken, token.refreshToken);
    dispatch({
      type: "LOGIN",
      payload: {
        user,
      },
    });
  };

  const register = async (parents) => {
    // Tạo một Blob từ chuỗi string
    const blob = new Blob([parents.image], { type: 'image/jpeg' }); // Thay 'image/jpeg' bằng kiểu dữ liệu của hình ảnh của bạn nếu cần
    const formData = new FormData();
    formData.append("Fullname", parents.fullName);
    formData.append("Email", parents.email);
    formData.append("Password", parents.password);
    formData.append("Phonenumber", parents.phoneNumber);
    formData.append("DateOfBirth", parents.dateOfBirth);
    formData.append("Address", parents.address);
    formData.append("District", parents.district);
    formData.append("City", parents.city);
    formData.append("Gender", parents.gender);
    // formData.append("imageFile", parents.image);
    formData.append("imageFile", blob, parents.image);
    console.log(formData)
    const response = await RegisterParent(formData)
    const responseJson = await response.json();
    console.log(responseJson.statusCode);
    if (responseJson.statusCode == 400) {
      console.log(responseJson.message);
      toast.error(responseJson.message);
      return;
    }
    const user = responseJson.data;
    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
    if (responseJson.statusCode == 201) {
      toast.success("Đăng ký làm phụ huynh thành công")
      const timeout = setTimeout(() => {
        window.location.replace('/login');
      }, 4000);
      return () => clearTimeout(timeout);
    }
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };


  const register_tutor = async (tutor) => {
    const formData = new FormData();
    formData.append("Fullname", tutor.fullName);
    formData.append("Email", tutor.email);
    formData.append("Password", tutor.password);
    formData.append("Phonenumber", tutor.phoneNumber);
    formData.append("DateOfBirth", tutor.dateOfBirth);
    formData.append("Address", tutor.address);
    formData.append("District", tutor.district);
    formData.append("City", tutor.city);
    formData.append("Gender", tutor.gender);
    formData.append("IdentityNumber", tutor.idCart);
    formData.append("Job", tutor.job);
    formData.append("Major", tutor.major);

    for (let i = 0; i < tutor.imageUser.length; i++) {
      formData.append("imageFile", tutor.imageUser[i]);
    }
    for (let i = 0; i < tutor.imageIdentity.length; i++) {
      formData.append("idenFiles", tutor.imageIdentity[i]);
    }

    for (let i = 0; i < tutor.imageCertificate.length; i++) {
      formData.append("cerFiles", tutor.imageCertificate[i]);
    }

    // Upload ảnh chứng chỉ
    for (const cerFileName of tutor.imageCertificate) {
      const cerFile = await fetch(cerFileName)
        .then(response => response.blob())
        .then(blob => new File([blob], `${cerFileName}`, { type: 'image/jpeg' }));
      formData.append("cerFiles", cerFile);
    }


    console.log(formData)
    const response = await RegisterTutor(formData)
    const responseJson = await response.json();
    console.log(responseJson);
    if (responseJson.statusCode == 400) {
      console.log(responseJson.message);
      toast.error(responseJson.message);
      return;
    }
    const user = responseJson.data;
    dispatch({
      type: "REGISTER_TUTOR",
      payload: {
        user,
      },
    });
    if (responseJson.statusCode == 201) {
      toast.success("Đăng ký làm gia sư thành công")
      const timeout = setTimeout(() => {
        window.location.replace('/login');
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }
  const sendOtp = (otp, email) => {
    VerifyUser(otp, email).then(response => {
      if (response.statusCode === 200) {
        toast.success(response.message);
      } else {
        toast.error("Verify failed please try agian")
        return;
      }
    }).catch(error => {
      console.error("Error:", error.message);
    }).finally(() => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      let user = null;
      GetUserByToken(refreshToken).then(response => {
        console.log();
        if (response.statusCode === 200) {
          user = response.data
        }
      }).catch(error => {
        console.error("Error:", error.message);
        toast.error("Verify failed please try agian")
      }).finally(() => {
        console.log(user);
        if (user == null) {
          return;
        }
        setSession(accessToken, refreshToken);
        dispatch({
          type: "LOGIN",
          payload: {
            user: user,
          },
        });
      })
    })
  };

  return (
    <AuthContext1.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        logout,
        register,
        register_tutor,
        sendOtp
      }}
    >
      {children}
    </AuthContext1.Provider>
  );
}
export { AuthContext1, AuthProvider1 };
