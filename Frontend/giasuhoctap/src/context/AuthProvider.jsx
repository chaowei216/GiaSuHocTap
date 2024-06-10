import { useState, createContext, useEffect } from 'react'
import { GetUserByAccessToken } from '../api/AuthenApi';
const initialState = {
    isAuthenticated: false,
    isInitialized: false,
};
const AuthContext = createContext({ ...initialState });
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [auth, setAuth] = useState({
        ...initialState,
        user: null,
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                setAuth(prev => ({
                    ...prev,
                    isInitialized: true
                }))
                const accessToken = localStorage.getItem('accessToken');
                if (accessToken) {
                    const response = await GetUserByAccessToken(accessToken)
                    const responseJson = await response.json();
                    const user = responseJson?.result;
                    setUser(user)
                    setAuth(prev => ({
                        ...prev,
                        user: user,
                        accessToken: accessToken,
                        isAuthenticated: true,
                        isInitialized: true
                    }))
                }
            } catch (err) {
                console.log(err);
                setAuth(prev => ({
                    ...prev,
                    isInitialized: true,
                    isAuthenticated: false
                }))
            }
        }
        fetchData();
    }, [])
    const isLoggedIn = () => {
        return !!user
    }
    //console.log(auth.isAuthenticated);
    return (
        <AuthContext.Provider value={{ ...auth, setAuth, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;