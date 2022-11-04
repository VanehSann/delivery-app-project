import data from '../utils';

const { SET_USER_ACTION, SET_USER_ACTION_REGISTER } = data;

const INITIAL_STATE = {
  name: '',
  email: '',
  role: '',
};

const INITIAL_STATE_REGISTER = {
  name: '',
  email: '',
  role: '',
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER_ACTION:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
      role: action.payload.role,
    };
  default:
    return state;
  }
};

export const userReducerRegister = (state = INITIAL_STATE_REGISTER, action) => {
  switch (action.type) {
  case SET_USER_ACTION_REGISTER:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
      role: action.payload.role,
    };

  default:
    return state;
  }
};

export default { userReducer, userReducerRegister };
