import { SET_USER_ACTION } from '../utils';

const INITIAL_STATE = {
  name: '',
  email: '',
  role: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
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

export default userReducer;
