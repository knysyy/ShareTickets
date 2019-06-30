import * as types from '../actions/profile/actionsTypes';

const initialState = {
    loading: false,
    email: '',
    displayName: '',
    avatar: '',
    error: null
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_START:
            return {...state, loading: true, error: null};
        case types.GET_SUCCESS:
            return {
                ...state,
                loading: false,
                email: action.email,
                displayName: action.displayName,
                avatar: action.avatar,
            };
        case types.GET_ERROR:
            return {...state, loading: false, error: action.error};
        case types.SET_NAME:
            return {...state, displayName: action.displayName};
        case types.SET_EMAIL:
            return {...state, email: action.email};
        default:
            return state;
    }
};

export default profileReducer;