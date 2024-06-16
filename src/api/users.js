import axios from "./axios.js";

export const getUsersRequest = () => axios.get('/admin/users')

export const createUserRequest = (user) => axios.post('/admin/create',user)

export const updateUserRequest = (id,user) => axios.put(`/admin/${id}`,user)

export const deleteUserRequest = (id) => axios.delete(`/admin/${id}`)
// obtener usuario
export const getUserRequest = (id) => axios.get(`/admin/user/${id}`)

export const getSupportRequest = (data) => axios.post('/support',data)