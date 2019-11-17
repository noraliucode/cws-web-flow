import { combineReducers } from 'redux';
import commonReducer from './commonReducers';

const rootReducer = combineReducers({
	common: commonReducer
});

export default rootReducer;
