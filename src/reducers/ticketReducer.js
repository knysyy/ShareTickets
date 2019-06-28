import * as types from '../actions/ticket/actionsTypes';

const initialState = {
    loading: false,
    friendId: null,
    yourTickets: [],
    friendTickets: [],
    visible: false,
    error: null
};

const ticketReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_FRIEND_ID:
            return {...state, friendId: action.friendId};
        case types.GET_TICKETS_START:
            return {...state, loading: true, error: null};
        case types.GET_TICKETS_SUCCESS:
            return {...state, loading: false, yourTickets: action.yourTickets, friendTickets: action.friendTickets};
        case types.GET_TICKETS_ERROR:
            return {...state, loading: false, error: action.error};
        case types.SHOW_MODAL:
            return {...state, visible: true};
        case types.HIDE_MODAL:
            return {...state, visible: false};
        case types.ADD_TICKET_START:
            return {...state, loading: true, error: null};
        case types.ADD_TICKET_SUCCESS:
            return {...state, loading: false, friendTickets: action.friendTickets, visible: false};
        case types.ADD_TICKET_ERROR:
            return {...state, loading: false, visible: false, error: action.error};
        default:
            return state;
    }
};

export default ticketReducer;