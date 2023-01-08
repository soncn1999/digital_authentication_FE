import axios from '../axios';

let handleCreateNewArticle = (data) => {
    return axios.post('/api/create-new-articles', data);
}

let handleGetListArticle = (id, limit) => {
    return axios.get(`/api/get-list-articles?id=${id}&limit=${limit}`);
}

let handleGetListArticlePaginate = (limit, page) => {
    return axios.get(`/api/get-list-articles-paginate?limit=${limit}&page=${page}`);
}

let handleChangeStatusArticle = (data) => {
    return axios.post('/api/edit-status-article', data);
}

let handleDeleteArticle = (data) => {
    return axios.delete(`/api/delete-article?id=${data}`);
};

let handleEditArticle = (data) => {
    return axios.post('/api/edit-article', data);
}

export { handleCreateNewArticle, handleGetListArticle, handleChangeStatusArticle, handleDeleteArticle, handleEditArticle, handleGetListArticlePaginate }