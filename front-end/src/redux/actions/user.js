export const userLogin = (email, role) => ({
  type: SET_USER_ACTION,
  payload: { email, role },
});

export default userLogin;
