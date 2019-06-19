import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';

import reducers from '../reducers';

const configureStore = () => {
    const middleware = [ thunk ];
    return createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)));
};

export default configureStore;