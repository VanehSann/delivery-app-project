import { SET_USER_ACTION } from '../utils';

export const userLogin = (name, email, role) => ({
  type: SET_USER_ACTION,
  payload: { name, email, role },
});

export default userLogin;
