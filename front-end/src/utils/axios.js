import axios from 'axios';

const API = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
});

export const requestData = async (endpoint) => {
  const { data } = await API.get(endpoint);
  return data;
};

export const requestPost = async (endpoint, body) => {
  const { data } = await API.post(endpoint, body);
  return data;
};

export const requestRegister = async (endpoint, body) => {
  const { data } = await API.post(endpoint, body);
  return data;
};

export const requestAdminManage = async (endpoint) => {
  const { data } = await API.get(endpoint);
  return data;
};

export default API;
