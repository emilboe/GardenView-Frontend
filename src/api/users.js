import axios from 'axios';

const login = (email, password) => {
    return axios.post('https://gardenviewapp.herokuapp.com/login', { email, password });
};

const register = (firstName, lastName, email, password, role) => {
    console.log('axios sent: ', firstName, lastName, email, password, role)
    return axios.post('https://gardenviewapp.herokuapp.com/register', { firstName, lastName, email, password, role});
};

const fetchUsers = (headers) => {
    return axios.get('https://gardenviewapp.herokuapp.com/users', headers);
}
const editUser = (formData) => {
    return axios.put('https://gardenviewapp.herokuapp.com/edituser', formData);
    // return axios.get('/usersFUCK', headers);
}

//only authenticated users can do this request
const fetchMyUser = (headers) => {
    return axios.get('https://gardenviewapp.herokuapp.com/me', headers);
}

const updateStatus = (headers, status) => {
    return axios.patch('https://gardenviewapp.herokuapp.com/me', { status }, headers);
}

const updatePlace = (headers, place) => {
    return axios.patch('https://gardenviewapp.herokuapp.com/me', { place }, headers);
}

export { login, register, fetchUsers, fetchMyUser, updateStatus, updatePlace, editUser };