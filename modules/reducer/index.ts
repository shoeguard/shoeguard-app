import {combineReducers} from 'redux';
import account from './account';
import location from './location';

const rootReducer = combineReducers({account, location});

export default rootReducer;
