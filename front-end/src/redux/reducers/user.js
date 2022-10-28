import SET_USER_ACTION from '../utils';

const INITIAL_STATE = {
  email: '',
  role: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER_ACTION:
    return {
      ...state,
      email: action.payload.email,
      role: action.payload.role,
    };
  default:
    return state;
  }
};

export default userReducer;
