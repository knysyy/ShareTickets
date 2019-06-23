import * as types from '../actions/friend/actionsTypes';

const initialState = {
    loading: false,
    friends: [],
    error: null
};

const friendReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_FRIEND_START:
            return { ...state, loading: true };
        case types.GET_FRIEND_SUCCESS:
            return { ...state, friends: action.friends, loading: false };
        case types.GET_FRIEND_ERROR:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

export default friendReducer;