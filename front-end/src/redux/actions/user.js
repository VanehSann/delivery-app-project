import data from '../utils';

export const userLogin = (name, email, role) => ({
  type: data.SET_USER_ACTION,
  payload: { name, email, role },
});

export const userRegister = (payload) => ({
  type: data.SET_USER_ACTION_REGISTER,
  payload,
});

export default { userLogin, userRegister };
