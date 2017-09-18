import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './modules';

export const history = createHistory();

const middleware = [
  thunk,
  routerMiddleware(history)
];

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...middleware)
  )
);

export default store;