import { useContext } from "react";
//import AuthContext from "../context/AuthProvider";
import { AuthContext1 } from "../context/AuthProvider1";

const useAuth = () => {
    return useContext(AuthContext1);
}

export default useAuth;