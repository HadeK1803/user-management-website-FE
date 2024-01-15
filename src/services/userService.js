import axios from "axios";

const registerNewUser = (userData) => {
    return axios.post('http://localhost:8080/api/v1/register', userData);
}

const loginUser = (userData) => {
    return axios.post('http://localhost:8080/api/v1/login', userData);
}

const fetchAllUsers = (page, limit) => {

    return axios.get(`http://localhost:8080/api/v1/user/read?page=${page}&limit=${limit}`);

}
export {
    registerNewUser,
    loginUser,
    fetchAllUsers
}