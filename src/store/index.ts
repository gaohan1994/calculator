/**
 * created by Ghan 9.3
 * 
 * redux Store
 */

import { combineReducers } from 'redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './index';
import home, { Home, initState as HomeState } from './home';
import status, { Status, initState as StatusState } from './status';

export interface Stores {
  home: Home;
  status: Status;
}

export const StoreState = {
  home: HomeState,
  status: StatusState,
};

export default combineReducers({
  home,
  status,
});

const configureStore = () => {

  const store = process.env.NODE_ENV === 'production'
    ? createStore(
      rootReducer,
      compose(
        applyMiddleware(thunk)
      )
    )
    : createStore(
      rootReducer,
      compose(
        applyMiddleware(thunk, createLogger)
      )
    );
  return store;
};

export { configureStore };
