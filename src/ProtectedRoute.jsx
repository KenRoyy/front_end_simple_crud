import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";

export const ProtectedRoute = () => {
    const {loading,isAuthenticated} = useAuth()

    if(loading) return <h1>Cargando ...</h1>
    if(!loading && !isAuthenticated) return <Navigate to='/' replace/>
    
  return  <Outlet/>
}
