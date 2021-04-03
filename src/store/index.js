import {createStore, applyMiddleware, compose} from "redux";
import thunk from 'redux-thunk';
import {verifyAuth} from "../components/login/store/actioncreator";
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router'
import {reducer} from "./combinereducer";


export const history=createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer(history), composeEnhancers(
    applyMiddleware( routerMiddleware(history),thunk)
));
store.dispatch(verifyAuth())
export default store;


