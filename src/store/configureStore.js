// @flow
import { createStore, applyMiddleware } from 'redux';
import { reduxSearch } from 'redux-search';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';

import history from './history';
import rootReducer from '../reducers';

import type { Store } from '../types';

const middleware = [thunk, routerMiddleware(history)];

const enhancer = composeWithDevTools(
  applyMiddleware(...middleware),
  persistState('ui'),
  reduxSearch({
    resourceIndexes: {
      achievements: ['title', 'description', 'reward'],
    },
    resourceSelector: (resourceName, state) => state.entities[resourceName],
  }),
);

const configureStore = (): Store =>
  createStore(
    rootReducer,
    enhancer,
  );

export default configureStore;
