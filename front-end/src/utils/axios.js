import axios from 'axios';

const API = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
});

export const setTokenInHeaders = (token) => {
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

export const requestDelete = async (endpoint) => {
  await API.delete(endpoint);
};

export const requestPut = async (endpoint, body) => {
 const { data } = await API.put(endpoint, body);
 return data;
};

export default API;
