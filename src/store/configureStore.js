import { createStore, applyMiddleware } from 'redux';
import { reduxSearch } from 'redux-search';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';

import history from './history';
import rootReducer from '../reducers';

const middleware = [thunk, routerMiddleware(history)];

const enhancer = composeWithDevTools(
  applyMiddleware(...middleware),
  reduxSearch({
    resourceIndexes: {
      achievements: ['title', 'description', 'reward'],
    },
    resourceSelector: (resourceName, state) => state.entities[resourceName],
  }),
);

const configureStore = () =>
  createStore(
    rootReducer,
    enhancer,
  );

export default configureStore;
