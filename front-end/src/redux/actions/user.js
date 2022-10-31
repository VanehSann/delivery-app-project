import SET_USER_ACTION from '../utils';

export const userLogin = (email, role) => ({
  type: SET_USER_ACTION,
  payload: { email, role },
});

export const userRegister = (payload) => ({
  type: SET_USER_ACTION_REGISTER,
  payload, // { name, email, role }
});

export default { userLogin, userRegister };
