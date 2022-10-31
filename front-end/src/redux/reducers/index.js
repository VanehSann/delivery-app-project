import { combineReducers } from 'redux';
import userReducer from './user';
import sizeButtons from './sizeButtons';

const rootReducer = combineReducers({ userReducer, sizeButtons });

export default rootReducer;
