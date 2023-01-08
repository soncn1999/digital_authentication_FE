import axios from '../axios';

const handleLoginApi = (data) => {
    return axios.post('/api/login', data);
}

const handleRegisterApi = (data) => {
    return axios.post('/api/create-user', data);
}
//============================================

const getAllUsers = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`);
}

const createNewUser = (user) => {
    return axios.post('/api/create-user', user);
}

const deleteUser = (id) => {
    return axios.delete(`/api/delete-user?id=${id}`);
}

const updateUser = (user) => {
    return axios.post('/api/update-user', user);
}

const getAllCodes = (type) => {
    return axios.get(`/api/get-all-code?type=${type}`);
}

const createADemoFeatureData = (data) => {
    return axios.post('/api/post-demo-features', data);
}

const getAllDemoFeaturesData = () => {
    return axios.get('/api/get-demo-features');
}

export {
    handleLoginApi, getAllUsers, createNewUser, deleteUser, updateUser, getAllCodes, createADemoFeatureData,
    getAllDemoFeaturesData, handleRegisterApi
};
