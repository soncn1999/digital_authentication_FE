import actionTypes from '../actions/actionTypes';

const initialState = {
    isLogIn: false,
    adminInfo: null
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADMIN_LOGIN_SUCCESS:
            return {
                ...state,
                isLogIn: true,
                adminInfo: action.adminInfo
            }
        case actionTypes.ADMIN_LOGIN_FAIL:
            return {
                ...state,
                isLogIn: false,
                adminInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLogIn: false,
                adminInfo: null
            }
        default:
            return state;
    }
}

export default appReducer;