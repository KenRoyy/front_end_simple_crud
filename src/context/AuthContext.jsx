import Cookies from "js-cookie";
import { createContext, useState, useContext, useEffect } from "react";
import {
    registerRequest,
    loginRequest,
    verityTokenRequet,
    getProfileRequest
} from "../api/auth.js";
export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)

    const signup = async (user) => {
        try {
            const res = await registerRequest(user)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            setErrors(error.response.data)
        }
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user)
            setIsAuthenticated(true)
            setUser(res.data)
        } catch (error) {
            setErrors(error.response.data)
        }
    }

    const logout = () => {
        Cookies.remove("token")
        setUser(null)
        setIsAuthenticated(false)
    }

    const profile = async () => {
        try {
           const res = await getProfileRequest() 
           setIsAuthenticated(true)
           setUser(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get()
            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false)
                return setUser(null)
            }

            try {
                const res = await verityTokenRequet(cookies.token)
                if (!res.data) {
                    setIsAuthenticated(false)
                    setLoading(false)
                    return;
                }

                setIsAuthenticated(true)
                setUser(res.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
            }
        }
        checkLogin()
    }, [])

    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            logout,
            profile,
            loading,
            user,
            isAuthenticated,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
} 
