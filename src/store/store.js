import {applyMiddleware, combineReducers, createStore} from "redux";
import reducers from './reducers/index'
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers(reducers);

const initialState = JSON.parse(localStorage.getItem('turbo-zaim-state'));

export const store = createStore(rootReducer, initialState ? initialState : undefined, composeWithDevTools(applyMiddleware(thunk)))

store.subscribe(() => {
  localStorage.setItem('turbo-zaim-state', JSON.stringify(store.getState()));
});

window.store = store;
