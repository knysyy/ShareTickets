import { combineReducers } from "redux";
import authReducer from './authReducer';
import editReducer from './editReducer';
import routeReducer from './routeReducer';
import homeReducer from './homeReducer';

export default combineReducers({
    authReducer,
    editReducer,
    routeReducer,
    homeReducer,
});