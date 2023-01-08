import axios from '../axios';

const getListCategory = () => {
    return axios.get('/api/get-list-category');
}

const handleCreateNewCategory = (data) => {
    return axios.post('/api/create-new-category', data);
}

const handleEditCategory = (data) => {
    return axios.post('/api/edit-category', data);
};

const handleDeleteCategory = (id) => {
    return axios.delete(`/api/delete-category?id=${id}`);
}

export { getListCategory, handleCreateNewCategory, handleEditCategory, handleDeleteCategory };