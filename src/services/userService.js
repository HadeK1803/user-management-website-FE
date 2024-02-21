// import axios from "axios";
import axios from "../config/axios"

const registerNewUser = (userData) => {
    return axios.post('/api/v1/register', userData);
}

const loginUser = (userData) => {
    return axios.post('/api/v1/login', userData);
}

const fetchAllUsers = (page, limit) => {

    return axios.get(`/api/v1/user/read?page=${page}&limit=${limit}`);
}
const deleteUser = (user) => {
    return axios.delete(`/api/v1/user/delete`, { data: { id: user.id } });
}

const fetchGroup = () => {
    return axios.get(`/api/v1/group/read`);
}

const createNewUser = (userData) => {
    return axios.post("/api/v1/user/create", { ...userData });
}

const updateCurrentUser = (userData) => {
    return axios.put("/api/v1/user/update", { ...userData });
}
const getUserAccount = () => {
    return axios.get("/api/v1/account");
}
const logoutUser = () => {
    return axios.post("/api/v1/logout", {});
}
export {
    registerNewUser,
    loginUser,
    fetchAllUsers,
    deleteUser,
    fetchGroup,
    createNewUser,
    updateCurrentUser,
    getUserAccount,
    logoutUser
}