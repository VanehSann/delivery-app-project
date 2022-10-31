import data from '../utils';


export const userLogin = (email, role) => ({
  type: data.SET_USER_ACTION,
  payload: { email, role },

export const userLogin = (name, email, role) => ({
  type: SET_USER_ACTION,
  payload: { name, email, role },
});

export const userRegister = (payload) => ({
  type: data.SET_USER_ACTION_REGISTER,
  payload,
});

// export const userAdminManage = (payload) => ({
//   type: data.SET_USER_ACTION_ADMIN_MANAGER,
//   payload,
// });

export default { userLogin, userRegister };
