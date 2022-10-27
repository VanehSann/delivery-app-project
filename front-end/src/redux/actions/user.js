export const SET_USER_ACTION = 'SET_USER_ACTION';

export const userLogin = (email, role) => ({
  type: SET_USER_ACTION,
  payload: { email, role },
});
