import axios from '../axios';

let handleCreateNewUser = (data) => {
    return axios.post('/api/create-user', data);
}

const handleGenerateSign = (data) => {
    return axios.post('/api/create-signature', data);
}

let handleVerifySignature = (data) => {
    return axios.post('/api/verify-signature', data);
}

let handleEncryptData = (data) => {
    return axios.post('/api/encrypt-data', data);
}

let handleDecryptData = (data) => {
    return axios.post('/api/decrypt-data', data);
}

let handleCreateOTP = (data) => {
    return axios.post('/api/create-otp', data);
}

export { handleCreateNewUser, handleVerifySignature, handleEncryptData, handleDecryptData, handleCreateOTP, handleGenerateSign }