import { combineReducers } from "redux";
import authReducer from './authReducer';
import editReducer from './editReducer';
import routeReducer from './routeReducer';
import friendReducer from './friendReducer';
import ticketReducer from './ticketReducer';

export default combineReducers({
    authReducer,
    editReducer,
    routeReducer,
    friendReducer,
    ticketReducer
});