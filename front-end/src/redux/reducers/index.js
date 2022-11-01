import { combineReducers } from 'redux';
import sizeButtons from './sizeButtons';
import { userReducer, userReducerRegister } from './user';

const rootReducer = combineReducers({ userReducer, userReducerRegister, sizeButtons });

export default rootReducer;
