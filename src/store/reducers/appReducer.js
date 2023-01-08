import actionTypes from '../actions/actionTypes';

const initContentOfConfirmModal = {
    isOpen: false,
    messageId: "",
    handleFunc: null,
    dataFunc: null
}

const initialState = {
    started: true,
    language: 'vi',
    systemMenuPath: '/system/user-manage',
    listCategory: [],
    listArticle: [],
    contentOfConfirmModal: {
        ...initContentOfConfirmModal
    }
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.APP_START_UP_COMPLETE:
            return {
                ...state,
                started: true
            }
        case actionTypes.SET_CONTENT_OF_CONFIRM_MODAL:
            return {
                ...state,
                contentOfConfirmModal: {
                    ...state.contentOfConfirmModal,
                    ...action.contentOfConfirmModal
                }
            }
        case actionTypes.CHANGE_LANGUAGE:
            return {
                ...state,
                language: action.language
            }
        case actionTypes.GET_ALL_CATEGORY_SUCCESS:
            console.log(action.data);
            return {
                ...state,
                listCategory: action.data
            }
        case actionTypes.GET_ALL_CATEGORY_FAILED:
            return {
                ...state,
            }
        case actionTypes.GET_LIST_ARTICLE_SUCCESS:
            return {
                ...state,
                listArticle: action.data
            }
        case actionTypes.GET_LIST_ARTICLE_FAILED:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default appReducer;