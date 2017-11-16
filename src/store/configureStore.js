import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const middleware = [thunk, apiMiddleware];

const configureStore = () =>
  createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware)),
  );

export default configureStore;
