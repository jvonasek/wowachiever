import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';

import history from './history';
import rootReducer from '../reducers';

const middleware = [thunk, routerMiddleware(history)];

const configureStore = () =>
  createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware)),
  );

export default configureStore;
