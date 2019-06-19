import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import reducers from '../reducers';

const configureStore = () => {
    const middleware = [ thunk ];
    return createStore(reducers, applyMiddleware(...middleware));
};

export default configureStore;