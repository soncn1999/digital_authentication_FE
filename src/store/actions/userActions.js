import actionTypes from './actionTypes';
import { handleLoginApi, getAllUsers, getAllCodes, createNewUser, deleteUser, updateUser, getAllDemoFeaturesData, handleRegisterApi } from '../../services/userService';
import { reject } from 'lodash';
import { toast } from 'react-toastify';
import { emitter } from '../../utils/emiter';

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})
// user login
export const handleLoginRedux = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await handleLoginApi(data);
            if (response && response.errCode === 0) {
                toast.success('🐶 Login Success!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(userLoginSuccess({ userData: response.data, currentData: '' }));
            } else {
                dispatch(userLoginFail());
                toast.error('🐦 Login Failed!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            toast.error('🐦 Login Failed!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch(userLoginFail());
        }
    }
}

export const userLoginSuccess = (data) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: data,
})

export const importDataSuccess = (data) => ({
    type: actionTypes.IMPORT_DATA_SUCCESS,
    data: data,
})

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})

export const handleRegisterRedux = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await handleRegisterApi(data);

            if (response && response.errCode === 0) {
                toast.success('🐶 Create New Account Success!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                let createUserInfo = {
                    privateKey: response.private_key,
                    publicKey: response.public_key,
                    certificate: response.certificate,
                }

                dispatch(userLoginSuccess({ userData: response.data, currentData: createUserInfo }));
                emitter.emit('EVENT_DOWNLOAD_USER_INFO', {
                    'id': 'your id',
                });
            } else {
                dispatch(userLoginFail());
                toast.error('🐦 Create New Account Failed!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            toast.error('🐦 Login Failed!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch(userLoginFail());
        }
    }
}

// user CRUD
export const getUserRedux = (id) => {
    return async (dispatch, getState) => {
        if (id === 'ALL') {
            try {
                let response = await getAllUsers(id);
                if (response && response.errCode === 0) {
                    toast.success('🐶 Data loading success!', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    dispatch(getListUserCRUDSuccess(response.data));
                } else {
                    toast.error(`🐦 Something wrong!, ${response.message}`, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    dispatch(getListUserCRUDFailed());
                }
            } catch (error) {
                reject(error);
                dispatch(getListUserCRUDFailed());
            }
        }
    }
}

export const getListUserCRUDSuccess = (data) => ({
    type: actionTypes.GET_LIST_USER_CRUD_SUCCESS,
    data: data,
})

export const getListUserCRUDFailed = () => ({
    type: actionTypes.GET_LIST_USER_CRUD_FAILED,
})

export const createNewUserCRUD = (user) => {
    return async (dispatch, getState) => {
        try {
            let response = await createNewUser(user);
            console.log(response);
            if (response && response.errCode == 0) {
                toast.success('🐶 Created new user!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(createUserCRUDSuccess());
                dispatch(getUserRedux('ALL'));
            } else {
                toast.error(`🐦 Created Failed, ${response.message}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(createUserCRUDFailed());
            }
        } catch (error) {
            console.log(error);
            toast.error(`🐦 Created Failed! ${error}`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch(createUserCRUDFailed());
        }
    }
}

export const createUserCRUDSuccess = () => ({
    type: actionTypes.CREATE_USER_CRUD_SUCCESS,
})

export const createUserCRUDFailed = () => ({
    type: actionTypes.CREATE_USER_CRUD_FAILED,
})

// get All Code
export const getAllCode = (type) => {
    return async (dispatch, getState) => {
        try {
            if (type === 'POSITION') {
                let response = await getAllCodes(type);
                if (response && response.errCode === 0) {
                    dispatch(getPositionCodeSuccess(response.data));
                } else {
                    dispatch(getPositionCodeFailed());
                }
            }
            if (type === 'ROLE') {
                let response = await getAllCodes(type);
                if (response && response.errCode === 0) {
                    dispatch(getRoleCodeSuccess(response.data));
                } else {
                    dispatch(getRoleCodeFailed());
                }
            }
            if (type === 'STATUS') {
                let response = await getAllCodes(type);
                if (response && response.errCode === 0) {
                    dispatch(getStatusCodeSuccess(response.data));
                } else {
                    dispatch(getStatusCodeFailed());
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const getPositionCodeSuccess = (data) => ({
    type: actionTypes.GET_POSITION_CODE_SUCCESS,
    data: data,
})

export const getPositionCodeFailed = () => ({
    type: actionTypes.GET_POSITION_CODE_FAILED,
})

export const getRoleCodeSuccess = (data) => ({
    type: actionTypes.GET_ROLE_CODE_SUCCESS,
    data: data,
})

export const getRoleCodeFailed = () => ({
    type: actionTypes.GET_ROLE_CODE_FAILED,
})

export const getStatusCodeSuccess = (data) => ({
    type: actionTypes.GET_STATUS_CODE_SUCCESS,
    data: data,
})

export const getStatusCodeFailed = () => ({
    type: actionTypes.GET_STATUS_CODE_FAILED,
})

export const deleteUserCRUD = (id) => {
    return async (dispatch, getState) => {
        try {
            let response = await deleteUser(id);
            if (response && response.errCode === 0) {
                toast.success('🐶 Deleted user!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(deleteUserCRUDSuccess());
                dispatch(getUserRedux('ALL'));
            } else {
                toast.error(`🐦 Delete Failed! ${response.message}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(deleteUserCRUDFailed());
            }
        } catch (error) {
            console.log(error);
            toast.error(`🐦 Delete Failed! ${error}`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch(deleteUserCRUDFailed());
        }
    }
}

export const deleteUserCRUDSuccess = () => ({
    type: actionTypes.DELETE_USER_CRUD_SUCCESS,
})

export const deleteUserCRUDFailed = () => ({
    type: actionTypes.DELETE_USER_CRUD_FAILED,
})

export const EditUserCRUD = (user) => {
    return async (dispatch, getState) => {
        try {
            let response = await updateUser(user);
            if (response && response.errCode === 0) {
                toast.success('🐶 Update user success!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(editUserCRUDSuccess());
                dispatch(getUserRedux('ALL'));
            } else {
                toast.error(`🐦 Update Failed! ${response.message}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(editUserCRUDFailed());
            }
        } catch (error) {
            console.log(error);
            toast.error(`🐦 Update Failed! ${error}`, {
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

export const editUserCRUDSuccess = () => ({
    type: actionTypes.EDIT_USER_CRUD_SUCCESS,
})

export const editUserCRUDFailed = () => ({
    type: actionTypes.EDIT_USER_CRUD_FAILED,
})

// Demo Features
export const getAllDemoFeatures = () => {
    return async (dispatch, getState) => {
        try {
            let users = await getAllDemoFeaturesData();

            if (users && users.errCode === 0) {
                toast.success('🐶 Loading demo features success!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(getAllDemoFeaturesSuccess(users.data));
            } else {
                toast.error(`🐦 Loading demo features Failed!`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(getAllDemoFeaturesFailed());
            }
        } catch (error) {
            console.log(error);
            toast.error(`🐦 Loading demo features Failed!`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch(getAllDemoFeaturesFailed());
        }
    }
}

export const getAllDemoFeaturesSuccess = (users) => ({
    type: actionTypes.GET_ALL_DEMO_FEATURES_SUCCESS,
    data: users
});

export const getAllDemoFeaturesFailed = () => ({
    type: actionTypes.GET_ALL_DEMO_FEATURES_FAILED,
});
