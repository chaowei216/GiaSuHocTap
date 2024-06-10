import { createContext, useEffect, useReducer } from "react";
import { GetUserByAccessToken, SignIn } from "../api/AuthenApi";
import { isValidToken, setSession } from "../utils/jwtValid"
//---------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
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
  //   LOGOUT: (state) => ({
  //     ...state,
  //     isAuthenticated: false,
  //     user: null,
  //   }),
  //   REGISTER: (state, action) => {
  //     const { user } = action.payload;

  //     return {
  //       ...state,
  //       isAuthenticated: true,
  //       user,
  //     };
  //   },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext1 = createContext({
  ...initialState,
  method: "jwt",
  login: () => Promise.resolve(),
  //logout: () => Promise.resolve(),
  //register: () => Promise.resolve(),
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

          const response = await GetUserByAccessToken(accessToken)
          const responseJson = await response.json();
          const { user } = responseJson.result;

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user: user,
            },
          });
      // ne gio sau cai else la se dung` api refresh token neu no tra ve status code 400 thi minh chay cai set 
      // session(null) con ra true 200 thi set session la 2 cai responseJson la access va refresh          
        } else {
          setSession(null);
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
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
    const { token, user } = responseJson.data;
    //localStorage.setItem("accessToken", accessToken);
    console.log(token.accessToken);
    setSession(token.accessToken, token.refreshToken);
    dispatch({
      type: "LOGIN",
      payload: {
        user,
      },
    });
  };

  //   const register = async (
  //     email,
  //     password,
  //     firstName,
  //     lastName,
  //     displayName
  //   ) => {
  //     const object = {
  //         email: email,
  //     }

  //     const response = await axios.post("/users/register", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     const { accessToken, user } = response.data.data;

  //     window.localStorage.setItem("accessToken", accessToken);
  //     dispatch({
  //       type: "REGISTER",
  //       payload: {
  //         user,
  //       },
  //     });
  //   };

  //   const logout = async () => {
  //     setSession(null);
  //     dispatch({ type: "LOGOUT" });
  //   };

  return (
    <AuthContext1.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        //logout,
        //register,
      }}
    >
      {children}
    </AuthContext1.Provider>
  );
}
export { AuthContext1, AuthProvider1 };
