import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import searchResults from './modules/searchResults';
import savedSearchResults from './modules/savedSearchResults';
import searchNotebooks from './modules/searchNotebooks';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const reducer = combineReducers({
  searchResults,
  searchNotebooks,
  savedSearchResults,
});

const configureStore = (initialState) => createStore(
  reducer,
  initialState,
  composeEnhancers(
    applyMiddleware(thunk),
  ),
);
export default configureStore;
