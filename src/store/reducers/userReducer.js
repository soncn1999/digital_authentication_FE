import actionTypes from '../actions/actionTypes';

const initialState = {
    isLogIn: false,
    userInfo: null,
    currentUserInfo: null,
    listUser: [],
    positions: [],
    roles: [],
    status: [],
    listDemoFeatures: [],
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLogIn: true,
                userInfo: action.userInfo.userData,
                currentUserInfo: action.userInfo.currentData
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLogIn: false,
                userInfo: null
            }
        case actionTypes.IMPORT_DATA_SUCCESS:
            return {
                ...state,
                currentUserInfo: action.data
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLogIn: false,
                userInfo: null
            }
        case actionTypes.GET_LIST_USER_CRUD_SUCCESS:
            let copyState = { ...state };
            copyState.listUser = action.data;
            return {
                ...copyState,
            }
        case actionTypes.GET_LIST_USER_CRUD_FAILED:
            return {
                ...state,
            }
        case actionTypes.GET_POSITION_CODE_SUCCESS:
            return {
                ...state,
                positions: action.data
            }
        case actionTypes.GET_POSITION_CODE_FAILED:
            return {
                ...state,
            }
        case actionTypes.GET_ROLE_CODE_SUCCESS:
            return {
                ...state,
                roles: action.data
            }
        case actionTypes.GET_ROLE_CODE_FAILED:
            return {
                ...state,
            }
        case actionTypes.GET_ALL_DEMO_FEATURES_SUCCESS:
            return {
                ...state,
                listDemoFeatures: action.data,
            }
        case actionTypes.GET_ALL_DEMO_FEATURES_FAILED:
            return {
                ...state,
            }
        case actionTypes.GET_STATUS_CODE_SUCCESS:
            return {
                ...state,
                status: action.data,
            }
        case actionTypes.GET_STATUS_CODE_FAILED:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default userReducer;