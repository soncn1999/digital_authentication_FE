import actionTypes from './actionTypes';
import { getListCategory, handleCreateNewCategory, handleEditCategory, handleDeleteCategory } from '../../services/categoryService';
import { handleCreateNewArticle, handleGetListArticle, handleChangeStatusArticle, handleDeleteArticle, handleEditArticle } from '../../services/articleService';
import { toast } from 'react-toastify';

export const appStartUpComplete = () => ({
    type: actionTypes.APP_START_UP_COMPLETE
});

export const setContentOfConfirmModal = (contentOfConfirmModal) => ({
    type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
    contentOfConfirmModal: contentOfConfirmModal
});

export const changeLanguage = (language) => ({
    type: actionTypes.CHANGE_LANGUAGE,
    language: language
});

export const getAllCategory = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getListCategory();
            if (response && response.errCode == 0) {
                toast.success('🐶 Loading Category Success!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(getAllCategorySuccess(response.data));
            } else {
                toast.error(`🐦 Loading Category Failed! ${response.message}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(getAllCategoryFailed());
            }
        } catch (error) {
            console.log(error);
            toast.error(`🐦 Loading Category Failed! ${error}`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
}

export const getAllCategorySuccess = (listCategory) => ({
    type: actionTypes.GET_ALL_CATEGORY_SUCCESS,
    data: listCategory
});

export const getAllCategoryFailed = () => ({
    type: actionTypes.GET_ALL_CATEGORY_FAILED,
});

export const createNewCategory = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await handleCreateNewCategory(data);
            if (response && response.errCode == 0) {
                toast.success('🐶 Create new Category Success!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(createCategorySuccess());
                dispatch(getAllCategory());
            } else {
                toast.error(`🐦 Create new category Failed! ${response.message}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(createCategoryFailed());
            }
        } catch (error) {
            toast.error(`🐦 Create new category Failed! ${error}`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch(createCategoryFailed());
        }
    }
}

export const createCategorySuccess = () => ({
    type: actionTypes.CREATE_CATEGORY_SUCCESS,
});

export const createCategoryFailed = () => ({
    type: actionTypes.CREATE_CATEGORY_FAILED,
});


export const editCategory = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await handleEditCategory(data);
            if (response && response.errCode === 0) {
                toast.success('🐶 Update Category Success!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(editCategorySuccess());
                dispatch(getAllCategory());
            } else {
                toast.error(`🐦 Update category Failed! ${response.message}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(editCategoryFailed());
            }
        } catch (error) {
            console.log(error);
            toast.error(`🐦 Update Category Failed! ${error}`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch(editCategoryFailed());
        }
    }
}

export const editCategorySuccess = () => ({
    type: actionTypes.EDIT_CATEGORY_SUCCESS,
});

export const editCategoryFailed = () => ({
    type: actionTypes.EDIT_CATEGORY_FAILED,
});

export const deleteCategory = (id) => {
    return async (dispatch, getState) => {
        try {
            let response = await handleDeleteCategory(id);
            if (response && response.errCode == 0) {
                toast.success('🐶 Delete Category Success!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(deleteCategorySuccess());
                dispatch(getAllCategory());
            } else {
                toast.error(`🐦 Delete Category Failed! ${response.message}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(deleteCategoryFailed());
            }
        } catch (error) {
            console.log(error);
            toast.error(`🐦 Delete Category Failed! ${error}`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch(deleteCategoryFailed());
        }
    }
}

export const deleteCategorySuccess = () => ({
    type: actionTypes.DELETE_CATEGORY_SUCCESS,
});

export const deleteCategoryFailed = () => ({
    type: actionTypes.DELETE_CATEGORY_FAILED,
});

export const createNewArticle = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await handleCreateNewArticle(data);
            if (response && response.errCode == 0) {
                toast.success('🐶 Create New Article Success!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(createArticleSuccess());
                dispatch(getListArticle('ALL', 10));
            } else {
                toast.error(`🐦 Create New Article Failed! ${response.message}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(createArticleFailed());
            }
        } catch (error) {
            console.log(error);
            toast.error(`🐦 Create New Article Failed! ${error}`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch(createArticleFailed());
        }
    }
}

export const createArticleSuccess = () => ({
    type: actionTypes.CREATE_ARTICLE_SUCCESS,
});

export const createArticleFailed = () => ({
    type: actionTypes.CREATE_ARTICLE_FAILED,
});

export const getListArticle = (id, limit) => {
    return async (dispatch, getState) => {
        try {
            let response = await handleGetListArticle(id, limit);
            if (response && response.errCode === 0) {
                toast.success('🐶 Loading Article Success!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(getListArticleSuccess(response.data));
            } else {
                toast.error(`🐦 Loading List Article Failed! ${response.message}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(getListArticleFailed());
            }
        } catch (error) {
            console.log(error);
            toast.error(`🐦 Loading List Article Failed! ${error}`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch(getListArticleFailed());
        }
    }
}

export const getListArticleSuccess = (data) => ({
    type: actionTypes.GET_LIST_ARTICLE_SUCCESS,
    data: data,
});

export const getListArticleFailed = () => ({
    type: actionTypes.GET_LIST_ARTICLE_FAILED,
});

export const changeStatusArticle = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await handleChangeStatusArticle(data);
            if (response && response.errCode === 0) {
                toast.success('🐶 Change Status Article Success!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(changeStatusArticleSuccess(response.data));
            } else {
                toast.error(`🐦 Change Status Article Failed! ${response.message}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(changeStatusArticleFailed());
            }
        } catch (error) {
            console.log(error);
            toast.error(`🐦 Change Status Article Failed! ${error}`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch(changeStatusArticleFailed());
        }
    }
}

export const changeStatusArticleSuccess = () => ({
    type: actionTypes.CHANGE_STATUS_ARTICLE_SUCCESS,
});

export const changeStatusArticleFailed = () => ({
    type: actionTypes.CHANGE_STATUS_ARTICLE_FAILED,
});

export const deleteArticle = (id) => {
    return async (dispatch, getState) => {
        try {
            let response = await handleDeleteArticle(id);
            if (response && response.errCode === 0) {
                toast.success('🐶 Delete Article Success!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(deleteArticleSuccess());
                dispatch(getListArticle('ALL', 10));
            } else {
                toast.error(`🐦 Delete Article Failed! ${response.message}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(deleteArticleFailed());
            }
        } catch (error) {
            console.log(error);
            toast.error(`🐦 Delete Article Failed! ${error}`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch(deleteArticleFailed());
        }
    }
}

export const deleteArticleSuccess = () => ({
    type: actionTypes.DELETE_ARTICLE_SUCCESS,
});

export const deleteArticleFailed = () => ({
    type: actionTypes.DELETE_ARTICLE_FAILED,
});

export const editArticle = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await handleEditArticle(data);
            if (response && response.errCode === 0) {
                toast.success('🐶 Update Article Success!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(editArticleSuccess());
                dispatch(getListArticle('ALL', 10));
            } else {
                toast.error(`🐦 Update Article Failed! ${response.message}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(editArticleFailed());
            }
        } catch (error) {
            console.log(error);
            toast.error(`🐦 Update Article Failed! ${error}`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch(editArticleFailed());
        }
    }
}

export const editArticleSuccess = () => ({
    type: actionTypes.EDIT_ARTICLE_SUCCESS,
});

export const editArticleFailed = () => ({
    type: actionTypes.EDIT_ARTICLE_FAILED,
});