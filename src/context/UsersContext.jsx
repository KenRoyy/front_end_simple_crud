import { createContext, useContext, useEffect, useState } from "react";
import {
    getUsersRequest,
    createUserRequest,
    updateUserRequest,
    deleteUserRequest,
    getUserRequest,
    getSupportRequest
} from "../api/users";
export const UserContext = createContext()

export const useUsers = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('userContext must be userd within an AuthProvider')
    }
    return context
}

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([])
    const [errors, setErrors] = useState([])
    const [success, setSuccess] = useState(null)

    const getUsers = async () => {
        try {
            const res = await getUsersRequest() 
            setUsers(res.data)
        } catch (error) {
            console.log(error)
            setSuccess('cargando usuarios')
        }
    }

    const createUser = async (user) => {
        try {
            const res = await createUserRequest(user)
            setUsers(res.data)
            setSuccess('Usuario creado correctamente')
        } catch (error) {
            setErrors(error.response.data)
        }
    }

    const deleteUser = async (id) => {
        try { 
            const res = await deleteUserRequest(id)
             if(res.status === 200) setUsers(users.filter(user => user.user_id != id))
            console.log(res)
             setSuccess('Usuario eliminado')
        } catch (error) {
            console.log(error)
        }
    }

    const updateUser = async (id,user) => {
        try {
           await updateUserRequest(id,user) 
           setSuccess('Usuario actualizado')
        } catch (error) {
           console.log('error al actualizar usuario')
           console.log(error) 
           setErrors(error.response.data)
        }
    }

    const getUser = async (id) => {
        try {
           const res = await getUserRequest(id)
           console.log(res)
           return res.data
        } catch (error) {
           console.log(error) 
        }
    }

    useEffect(() => {
        if(errors.length > 0){
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    const getSupport = async (data) =>{
        try {
           const res = await getSupportRequest(data) 
           setSuccess('mensaje enviado')
        } catch (error) {
            console.log('error al enviar los datos al correo') 
        }
    }

    const resetSuccess = () => setSuccess(null)

    return (
        <UserContext.Provider value={{
            users,
            success,
            resetSuccess,
            errors,
            getUsers,
            getUser,
            createUser,
            deleteUser,
            updateUser,
            getSupport
        }}>
            {children}
        </UserContext.Provider>
    )
}