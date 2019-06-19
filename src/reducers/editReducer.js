import * as types from '../actions/edit/actionsTypes';

const initialState = {
    loading: false,
    registered: false,
    error: null
};

const editReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.EDIT_START:
            return { ...state, loading: true };
        case types.EDIT_SUCCESS:
            return { ...state, loading:false, registered: true };
        case types.EDIT_ERROR:
            return { ...state, loading:false };
        default:
            return state;
    }
};

export default editReducer;