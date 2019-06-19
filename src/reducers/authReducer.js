import * as types from '../actions/auth/actionsTypes';

const initialState = {
    restoring: false,
    loading: false,
    user: {},
    error: null,
    logged: false,
    registered: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SESSION_RESTORING:
            return { ...state, restoring: true };
        case types.SESSION_LOADING:
            return { ...state, restoring: false, loading: true, error: null };
        case types.SESSION_SUCCESS:
            return {
                ...initialState,
                user: action.user,
                loading: false,
                logged: true
            };
        case types.SESSION_ERROR:
            return {
                ...initialState,
                loading: false,
                error: action.error
            };
        case types.SESSION_LOGOUT:
            return {
                ...initialState,
                loading: false
            };
        default:
            return state;
    }
};

export default authReducer;