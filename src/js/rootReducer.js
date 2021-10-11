import { combineReducers } from 'redux';
import AppReducer from './reducer/appReducer';

const rootReducer = combineReducers({
	app: AppReducer,
});

export default rootReducer;
