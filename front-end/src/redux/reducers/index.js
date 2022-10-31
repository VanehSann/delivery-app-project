import { combineReducers } from 'redux';
import { userReducer, userReducerRegister } from './user';

const rootReducer = combineReducers({ userReducer, userReducerRegister });

export default rootReducer;
