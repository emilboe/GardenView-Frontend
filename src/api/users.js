import axios from 'axios';

const login = (email, password) => {
    return axios.post('/login', { email, password });
};

const fetchUsers = (headers) => {
    return axios.get('/users', headers);
}

//only authenticated users can do this request
const fetchMyUser = (headers) => {
    return axios.get('/me', headers);
}

const updateStatus = (headers, status) => {
    return axios.patch('/me', {status}, headers);
}

const updatePlace = (headers, place) => {
    return axios.patch('/me', {place}, headers);
}

export { login, fetchUsers, fetchMyUser, updateStatus, updatePlace};