import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const INITIAL_STATE = {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootStore = createStore(
	rootReducer,
	INITIAL_STATE,
	composeEnhancers(applyMiddleware(thunk))
);

export default rootStore;
