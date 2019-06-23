import { combineReducers } from "redux";
import authReducer from './authReducer';
import editReducer from './editReducer';
import routeReducer from './routeReducer';
import friendReducer from './friendReducer';

export default combineReducers({
    authReducer,
    editReducer,
    routeReducer,
    friendReducer,
});