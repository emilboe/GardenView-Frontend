import axios from 'axios';

const login = (email, password) => {
    return axios.post('/login', { email, password });
};

const register = (firstName, lastName, email, password, role) => {
    console.log('axios sent: ', firstName, lastName, email, password, role)
    return axios.post('/register', { firstName, lastName, email, password, role});
};

const fetchUsers = (headers) => {
    return axios.get('/users', headers);
}
const editUser = (formData) => {
    return axios.put('/edituser', formData);
    // return axios.get('/usersFUCK', headers);
}

//only authenticated users can do this request
const fetchMyUser = (headers) => {
    return axios.get('/me', headers);
}

const updateStatus = (headers, status) => {
    return axios.patch('/me', { status }, headers);
}

const updatePlace = (headers, place) => {
    return axios.patch('/me', { place }, headers);
}

export { login, register, fetchUsers, fetchMyUser, updateStatus, updatePlace, editUser };