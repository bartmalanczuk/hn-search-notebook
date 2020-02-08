import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import searchResults from './modules/searchResults';

const reducer = combineReducers({
  searchResults,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (initialState) => createStore(
  reducer,
  initialState,
  composeEnhancers(
    applyMiddleware(thunk),
  ),
);
export default configureStore;
