import axios from 'axios';

const API_URL = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
});

export const setToken = (token) => {
  API_URL.defaults.headers.common.Authorization = token;
}; // inspirei no front de TFC

export const requestData = async (endpoint) => {
  const { data } = await API_URL.get(endpoint);
  return data;
};

export const requestLogin = async (endpoint, body) => {
  const { data } = await API_URL.post(endpoint, body);
  return data;
};

export const requestRegister = async (endpoint, body) => {
  const { data } = await API_URL.post(endpoint, body);
  return data;
};

export const requestAdminManage = async (endpoint) => {
  const { data } = await API_URL.get(endpoint);
  return data;
};

export default API_URL;
