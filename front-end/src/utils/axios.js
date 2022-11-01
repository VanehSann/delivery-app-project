import axios from 'axios';

const API = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
});

export const setToken = (token) => {
  API.defaults.headers.common.Authorization = token;
};

export const requestData = async (endpoint) => {
  const { data } = await API.get(endpoint);
  return data;
};

export const requestPost = async (endpoint, body) => {
  const { data } = await API.post(endpoint, body);
  return data;
};
export default API;
